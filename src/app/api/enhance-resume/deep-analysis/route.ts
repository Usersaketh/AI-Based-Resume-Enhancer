import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { pdfBase64, jobDescription = "General position analysis", analysisType = 'comprehensive' } = await req.json();

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

        let analysisPrompt = '';
        
        switch (analysisType) {
            case 'ats-optimization':
                analysisPrompt = `Perform deep ATS analysis. Return JSON:
{
    "atsScore": "X/100",
    "keywordAnalysis": {
        "missingKeywords": ["keyword1", "keyword2"],
        "presentKeywords": ["keyword1", "keyword2"]
    },
    "overallRecommendations": ["rec1", "rec2", "rec3"]
}

**ATS SCORING GUIDELINES:**
- 1-20: Major ATS issues, likely to be filtered out
- 21-40: Some ATS compatibility, needs significant improvement
- 41-60: Average ATS compatibility, room for optimization
- 61-80: Good ATS compatibility, minor improvements needed
- 81-100: Excellent ATS compatibility, optimized format

Be critical and honest with scoring based on actual ATS requirements.`;
                break;

            default: // comprehensive
                analysisPrompt = `Perform comprehensive resume analysis. Return JSON:
{
    "overallScore": "X/100",
    "atsScore": "X/100",
    "keywordAnalysis": {
        "missingKeywords": ["keyword1", "keyword2"],
        "presentKeywords": ["keyword1", "keyword2"]
    },
    "overallRecommendations": ["rec1", "rec2", "rec3", "rec4", "rec5"]
}

**COMPREHENSIVE SCORING GUIDELINES:**
- 1-20: Poor match, missing most requirements, major issues
- 21-40: Below average, significant gaps in skills/experience
- 41-60: Average match, some requirements met, needs improvement
- 61-80: Good match, most requirements met, well-structured
- 81-100: Excellent match, exceeds requirements, optimized

Use the full scoring range based on actual alignment with job requirements.`;
        }

        const fullPrompt = `${analysisPrompt}

Job Description: ${jobDescription}

Analyze the resume PDF and provide actionable recommendations. Return only valid JSON.`;

        
        let result;
        let modelUsed = '';

        // Always use Flash model to avoid quota issues
        try {
            const flashModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            result = await flashModel.generateContent([fullPrompt, pdfPart]);
            modelUsed = 'gemini-1.5-flash';
        } catch (flashError: any) {
            console.error('Flash model failed for deep analysis:', flashError.message);
            throw flashError;
        }

        const response = await result.response;
        const generatedText = await response.text();

        // Parse JSON response
        let analysis;
        try {
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                analysis = JSON.parse(jsonMatch[0]);
            } else {
                analysis = JSON.parse(generatedText);
            }
        } catch (parseError) {
            console.error('JSON parsing failed:', parseError);
            return new NextResponse(
                JSON.stringify({ error: 'Failed to parse analysis results' }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({ 
                deepAnalysisData: analysis,
                modelUsed: modelUsed 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error: any) {
        console.error('Deep analysis error:', error);
        
        let errorMessage = 'Deep analysis failed. Please try again.';
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
