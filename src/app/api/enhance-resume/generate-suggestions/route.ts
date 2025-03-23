import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        console.log('Entered the route');
        JSON.stringify({ test: 'Entered the route' });
        const { text, jobDescription } = await req.json();

        if (!text || !jobDescription) {
            console.log('Missing text or jobDescription:', { text, jobDescription });
            return new NextResponse(
                JSON.stringify({ error: 'Resume text and job description are required' }),
                { status: 400 }
            );
        }
        console.log('text:', text);
        console.log('jobDescription:', jobDescription);

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            console.log('API key not found');
            throw new Error('API key not found');
        }
        console.log('API key found');

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Limit input size to avoid overwhelming the model
        const maxLength = 1000;
        const truncatedText = text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
        const truncatedJobDescription = jobDescription.length > maxLength ? jobDescription.substring(0, maxLength) + '...' : jobDescription;


        const prompt = `
Review the following resume and provide structured, actionable suggestions to improve it, with a focus on **Applicant Tracking System (ATS) compliance** and alignment with the given job description. Ensure the feedback is concise, practical, and well-organized.

### **Key Requirements for Feedback:**
1. **Resume Score (Mandatory as First Suggestion)**:  
   - Provide a **resume match score out of 10** based on how well it aligns with the job description.  
   - In the **description**, explain the reasoning behind the score, highlighting key strengths and areas for improvement.  
   - Additionally, assess the likelihood of the candidate getting shortlisted based on the current resume.  

2. **Relevance to Job Description**:  
   - Identify any missing keywords, skills, or qualifications that should be added to better match the job description.  

3. **Avoid Repetition**:  
   - Detect frequently repeated words/phrases and suggest alternatives for better readability.  

4. **Spelling & Grammar**:  
   - Highlight any spelling or grammatical errors and provide corrections.  

5. **Quantify Achievements**:  
   - Recommend specific ways to include measurable impact in the work experience section (e.g., using metrics like % improvement, revenue growth, efficiency gains).  

6. **Formatting & Keywords**:  
   - Ensure the resume follows an ATS-friendly format and incorporates key industry-related terms from the job description.  

7. **Content Organization**:  
   - Suggest improvements for the structure of the resume to enhance readability and logical flow.  

Resume content:
${text}

Job description:
${jobDescription}


Please provide your suggestions in a clear and structured JSON format, addressing each point above in a maximum of 700 words. The output format should be:
{
    "suggestions": [
        {
            "heading": "[suggestion heading]",
            "description": "[suggestion description]"
        },
        {
            "heading": "[suggestion heading]",
            "description": "[suggestion description]"
        }
    ]
}
The first and major suggestion should be about the matching of the resume with the job description.
The suggestion 1 should always be the resume score out of 10 , based on the job description matching and the change of getting selected for that role,.. in descreption provide the analysis of the score obtained out of 10( like  7.5/10 etc).
Ensure the response is a valid JSON object without violating JSON rules.Provide the accurate one in JSON format.
`;

        console.log('Sending prompt to Gemini API');
        const result = await model.generateContent(prompt);
        console.log('Received response from Gemini API');
        const response = await result.response;
        const generatedText = await response.text();

        console.log('Raw response from Gemini:', generatedText);

        // Attempt to extract JSON from ```json ... ``` markers
        let suggestions;
        const jsonMatch = generatedText.match(/```json\s*([\s\S]*?)\s*```/);
        if (jsonMatch && jsonMatch[1]) {
            try {
                suggestions = JSON.parse(jsonMatch[1]);
                console.log('Parsed suggestions using JSON.parse:', suggestions);
            } catch (parseError) {
                console.error('Error parsing extracted JSON with JSON.parse:', parseError);
                console.error('Extracted JSON content:', jsonMatch[1]);
            }
        }

        // If JSON.parse failed or no JSON block was found, try alternative parsing methods
        if (!suggestions) {
            console.log('Attempting alternative JSON parsing methods...');

            // Method 1: Look for a JSON-like object in the response (e.g., { ... })
            const jsonFallbackMatch = generatedText.match(/{[\s\S]*}/);
            if (jsonFallbackMatch && jsonFallbackMatch[0]) {
                try {
                    suggestions = JSON.parse(jsonFallbackMatch[0]);
                    console.log('Parsed suggestions using fallback JSON.parse:', suggestions);
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
            JSON.stringify({ suggestions: suggestions.suggestions }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        console.error('Error generating the suggestions:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Error Generating the Suggestions' }),
            { status: 500 }
        );
    }
}