import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('API key not found');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are an expert HR professional and ATS optimization specialist. Based on the following work experience information, generate a professional, impactful job description that will excel in both ATS systems and impress hiring managers.

        Work Experience Information:
        ${text}

        Requirements for the generated description:
        1. Create exactly 2 bullet points that showcase key achievements and responsibilities
        2. Include quantifiable metrics and results (e.g., "increased efficiency by 35%", "managed team of 8 developers", "reduced costs by $50K annually")
        3. Use strong action verbs: led, managed, developed, implemented, optimized, delivered, designed, collaborated, streamlined
        4. Incorporate relevant industry keywords and technical skills
        5. Focus on impact, outcomes, and value delivered to the organization
        6. Each bullet point should be 15-25 words for optimal ATS scanning
        7. Use present tense for current roles, past tense for previous roles

        Format: Return only the 2 bullet points, each starting with "• " (bullet and space). No additional text, explanations, or formatting.

        Example output format:
        • Led cross-functional team of 6 engineers to deliver mobile application, increasing user engagement by 45%
        • Implemented automated testing framework reducing deployment time by 60% and improving code quality across 3 projects`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = await response.text();

        return new NextResponse(JSON.stringify({ suggestion: generatedText }), { status: 200 });
    } catch (error) {
        console.error('Error generating the suggestions:', error);
        return new NextResponse('Error Generating the Suggestions', { status: 500 });
    }
}
