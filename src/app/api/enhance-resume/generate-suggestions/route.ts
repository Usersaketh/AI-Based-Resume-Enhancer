import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { pdfBase64, jobDescription } = await req.json();

        if (!pdfBase64 || !jobDescription) {
            return new NextResponse(
                JSON.stringify({ error: 'Resume PDF and job description are required' }),
                { status: 400 }
            );
        }

        // Clean and validate PDF data
        const cleanedPdfBase64 = pdfBase64.replace(/^data:application\/pdf;base64,/, '').trim();
        
        if (!cleanedPdfBase64 || cleanedPdfBase64.length < 100) {
            return new NextResponse(
                JSON.stringify({ error: 'Invalid or corrupted PDF data' }),
                { status: 400 }
            );
        }

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('API key not found');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        
        // Always use Flash model to avoid quota issues

        // Prepare PDF file part for Gemini
        const pdfPart = {
            inlineData: {
                data: cleanedPdfBase64,
                mimeType: 'application/pdf'
            }
        };

        // Limit job description size
        const maxLength = 1000;
        const truncatedJobDescription = jobDescription.length > maxLength ? jobDescription.substring(0, maxLength) + '...' : jobDescription;


        const prompt = `You are a senior resume optimization expert, ATS specialist, and career coach with extensive experience in recruitment. Analyze the provided resume PDF against the job description and provide actionable, specific improvement suggestions.

**BE CRITICAL AND THOROUGH** - Don't default to average scores. Use the full 1-10 range honestly based on actual job match quality.

**CRITICAL: Your response must be a valid JSON object in exactly this format:**

{
    "suggestions": [
        {
            "heading": "Resume Match Score",
            "description": "Score: X/10. \n [Detailed analysis of why this score, what matches well, what needs improvement, keyword analysis, and likelihood of getting shortlisted with specific reasoning]"
        },
        {
            "heading": "[Specific improvement category]",
            "description": "[Detailed, actionable suggestion with specific examples and expected impact]"
        }
    ]
}

**DETAILED SCORING GUIDELINES - Be Honest and Specific:**

**Score 1-3 (Poor Match - Low Shortlisting Chance):** 
- Missing 60%+ of required skills/keywords
- Experience level significantly misaligned (junior applying for senior, etc.)
- Major ATS formatting issues (no clear sections, poor structure)
- Weak or no quantified achievements
- Industry/domain mismatch
- Critical skills completely absent

**Score 4-6 (Average Match - Moderate Shortlisting Chance):**
- Has 40-60% of required skills but missing key ones
- Experience somewhat relevant but notable gaps exist
- Basic formatting but needs ATS optimization
- Few quantified achievements, mostly job descriptions
- Some keyword matches but density too low
- Meets minimum requirements but lacks standout elements

**Score 7-8 (Good Match - High Shortlisting Chance):**
- 70-85% of required skills present with evidence
- Relevant experience level and career progression
- Good ATS-friendly formatting and structure
- Several quantified achievements with metrics
- Strong keyword alignment with job requirements
- Clear value proposition for the role

**Score 9-10 (Excellent Match - Very High Shortlisting Chance):**
- 90%+ requirements met or exceeded with strong evidence
- Perfect experience level and impressive career trajectory
- Excellent ATS optimization and professional presentation
- Numerous quantified achievements with significant impact
- Perfect keyword density and relevance
- Exceptional skills that differentiate from other candidates

**Analysis Requirements:**

1. **MANDATORY FIRST SUGGESTION - Resume Match Score:**
   - Provide a score out of 10 based on comprehensive alignment analysis
   - BE CRITICAL: Use the full 1-10 range, don't cluster around 4-6
   - Detailed reasoning: keyword coverage %, skill gap analysis, experience relevance
   - Assess shortlisting probability with specific percentage estimate
   - Identify top 3 strengths and top 3 gaps affecting the score

2. **Additional Priority Suggestions (5-7 total, ordered by impact):**
   - **Critical Missing Keywords**: Specific job-relevant terms with usage examples
   - **Quantified Achievements**: Exact metrics to add (%, $, time, scale, team size)
   - **Skills Gap Analysis**: Technical/soft skills from job description not evidenced
   - **ATS Optimization**: Specific formatting, section headers, keyword density fixes
   - **Impact Enhancement**: Transform weak descriptions into powerful achievement statements
   - **Structure & Flow**: Reorganization for maximum impact and readability
   - **Industry Alignment**: Domain-specific terminology and context improvements

**Deep Analysis Requirements:**
- Map EVERY job requirement to resume content (present/missing/weak)
- Identify specific quantifiable achievements that could be enhanced
- Check ATS compatibility: parsing, keywords, format
- Assess experience progression and role-level appropriateness
- Evaluate industry-specific knowledge demonstration
- Consider regional/cultural job market expectations

**Quality Standards:**
- Each suggestion must be specific and actionable
- Include examples of what to add/change
- Estimate impact on shortlisting chances
- Prioritize suggestions by potential ROI
- Consider both immediate fixes and strategic improvements

**Job Description:**
${truncatedJobDescription}

**Important:** Return ONLY the JSON object. No additional text, explanations, or formatting outside the JSON structure.`;

        let result;
        let modelUsed = '';

        // Always use Flash model to avoid quota issues
        try {
            const flashModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            result = await flashModel.generateContent([prompt, pdfPart]);
            modelUsed = 'gemini-1.5-flash';
        } catch (flashError: any) {
            console.error('Flash model failed:', flashError.message);
            throw flashError;
        }

        const response = await result.response;
        const generatedText = await response.text();

        // Attempt to extract JSON from ```json ... ``` markers
        let suggestions;
        const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                suggestions = JSON.parse(jsonMatch[1]);
            } catch (parseError) {
                console.error('Error parsing extracted JSON with JSON.parse:', parseError);
                console.error('Extracted JSON content:', jsonMatch[1]);
            }
        }

        // If JSON.parse failed or no JSON block was found, try alternative parsing methods
        if (!suggestions) {
            // Method 1: Look for a JSON-like object in the response (e.g., { ... })
            const jsonFallbackMatch = generatedText.match(/{[\s\S]*}/);
            if (jsonFallbackMatch && jsonFallbackMatch[0]) {
                try {
                    suggestions = JSON.parse(jsonFallbackMatch[0]);
                } catch (fallbackError) {
                    console.error('Fallback JSON.parse failed:', fallbackError);
                    console.error('Fallback JSON content:', jsonFallbackMatch[0]);
                }
            }
        }

        // Validate the structure of suggestions
        if (!suggestions.suggestions || !Array.isArray(suggestions.suggestions)) {
            console.error('Invalid suggestions structure:', suggestions);
            return new NextResponse(
                JSON.stringify({ error: 'Suggestions structure invalid', rawResponse: generatedText }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({ 
                suggestions: suggestions.suggestions,
                modelUsed: modelUsed 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error: any) {
        console.error('Error generating the suggestions:', error);
        
        // Provide user-friendly error messages based on error type
        let errorMessage = 'Error generating suggestions. Please try again.';
        let statusCode = 500;
        
        if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('rate limit')) {
            errorMessage = 'API quota exceeded. The service is temporarily unavailable. Please try again in a few minutes.';
            statusCode = 429;
        } else if (error.message?.includes('API key')) {
            errorMessage = 'Authentication error. Please check API configuration.';
            statusCode = 401;
        } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
            errorMessage = 'Network error. Please check your connection and try again.';
            statusCode = 503;
        }
        
        return new NextResponse(
            JSON.stringify({ 
                error: errorMessage,
                details: error.message,
                retryAfter: error.status === 429 ? 60 : undefined // Suggest retry after 60 seconds for quota errors
            }),
            { status: statusCode }
        );
    }
}
