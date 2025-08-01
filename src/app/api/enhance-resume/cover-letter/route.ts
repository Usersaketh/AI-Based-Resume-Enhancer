import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { pdfBase64, jobDescription = "General position opportunity", companyName, tone = 'professional' } = await req.json();

        if (!pdfBase64) {
            return new NextResponse(
                JSON.stringify({ error: 'PDF data is required' }),
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
            return new NextResponse(
                JSON.stringify({ error: 'API key not configured' }),
                { status: 500 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);

        const pdfPart = {
            inlineData: {
                data: cleanedPdfBase64,
                mimeType: 'application/pdf'
            }
        };

        const coverLetterPrompt = `You are an expert cover letter writer with years of experience in recruitment and career coaching. Based on the resume and job description, generate a compelling, personalized cover letter that stands out.

**BE CRITICAL AND THOROUGH** - Create a high-quality, tailored cover letter that truly matches the job requirements.

**Requirements:**
- Tone: ${tone}
- Company: ${companyName}
- Length: 3-4 paragraphs (250-350 words)
- Highlight 2-3 key achievements from resume that directly match job requirements
- Show genuine interest and research about the company/role
- Include a strong opening hook and compelling closing
- Use specific metrics and accomplishments from the resume
- Address potential concerns or gaps proactively
- Demonstrate clear value proposition

**Quality Scoring Guidelines (Rate 1-10):**
- **1-3 (Poor)**: Generic template, no personalization, weak language, no specific achievements
- **4-6 (Average)**: Some customization, basic achievements mentioned, standard format
- **7-8 (Good)**: Well-tailored, specific achievements, good flow, shows research
- **9-10 (Excellent)**: Exceptional personalization, compelling narrative, perfect job match, outstanding achievements

**Provide response in JSON format:**
{
    "coverLetter": "Full cover letter text with proper formatting and line breaks",
    "qualityScore": "X/10 with brief justification",
    "keyHighlights": ["specific achievement that matches job requirement", "relevant skill demonstration", "unique value proposition"],
    "personalizedElements": ["company-specific research point", "role-specific customization", "industry insight"],
    "improvementSuggestions": ["specific enhancement 1", "specific enhancement 2"],
    "strengthsIdentified": ["resume strength 1", "resume strength 2", "resume strength 3"],
    "alternativeVersions": {
        "confident": "More assertive version of opening paragraph",
        "enthusiastic": "More energetic version of opening paragraph", 
        "formal": "More traditional version of opening paragraph"
    },
    "matchAnalysis": {
        "jobRequirementMatch": "X/10 - how well the letter addresses job requirements",
        "personalBranding": "X/10 - how well it establishes unique value",
        "persuasiveness": "X/10 - how compelling and convincing it is"
    }
}

**Job Description:**
${jobDescription}

**Instructions:** 
1. Analyze the resume thoroughly for relevant achievements and skills
2. Match these directly to job requirements
3. Create a narrative that shows career progression and fit
4. Use specific numbers, metrics, and accomplishments
5. BE CRITICAL - don't settle for generic content
6. Score honestly using the full 1-10 range based on quality and job fit`;

        
        
        let result;
        let modelUsed = '';

        // Always use Flash model to avoid quota issues
        try {
            
            const flashModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            result = await flashModel.generateContent([coverLetterPrompt, pdfPart]);
            modelUsed = 'gemini-1.5-flash';
            
        } catch (flashError: any) {
            console.error('Flash model failed for cover letter generation:', flashError.message);
            throw flashError;
        }

        
        const response = await result.response;
        const generatedText = await response.text();

        let coverLetterData;
        try {
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                coverLetterData = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('Cover letter parsing failed:', parseError);
            return new NextResponse(
                JSON.stringify({ error: 'Failed to parse cover letter data', rawResponse: generatedText }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({ 
                coverLetterData,
                modelUsed: modelUsed 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Cover letter generation error:', error);
        
        let errorMessage = 'Cover letter generation failed. Please try again.';
        let statusCode = 500;
        
        if (error.status === 429 || error.message?.includes('quota')) {
            errorMessage = 'API quota exceeded. Please try again in a few minutes.';
            statusCode = 429;
        } else if (error.status === 400 || error.message?.includes('Bad Request')) {
            errorMessage = 'Invalid PDF data. Please try uploading a different PDF file.';
            statusCode = 400;
        }
        
        return new NextResponse(
            JSON.stringify({ 
                error: errorMessage,
                details: error.message 
            }),
            { status: statusCode }
        );
    }
}
