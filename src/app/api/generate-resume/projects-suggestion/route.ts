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

        const prompt = `You are an expert technical recruiter and ATS optimization specialist. Based on the following project information, generate a professional, compelling project description that will stand out to both ATS systems and human recruiters.

        Project Information:
        ${text}

        Requirements for the generated description:
        1. Create exactly 2 bullet points that highlight key achievements and technical skills
        2. Include quantifiable metrics where possible (e.g., "improved performance by 40%", "reduced load time by 60%", "handled 1000+ concurrent users")
        3. Use action verbs like: developed, implemented, optimized, designed, built, created, deployed, integrated
        4. Incorporate relevant technical keywords from the tech stack
        5. Focus on impact and results, not just what was built
        6. Each bullet point should be 15-25 words maximum for better readability
        7. Make it ATS-friendly by using standard technical terminology

        Format: Return only the 2 bullet points, each starting with "• " (bullet and space). No additional text, explanations, or formatting.

        Example output format:
        • Developed a full-stack web application using React and Node.js, serving 500+ daily active users with 99.9% uptime
        • Implemented real-time chat functionality with Socket.io, reducing message latency by 70% and improving user engagement`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = await response.text();

        return new NextResponse(JSON.stringify({ suggestion: generatedText }), { status: 200 });
    } catch (error) {
        console.error('Error generating the suggestions:', error);
        return new NextResponse('Error Generating the Suggestions', { status: 500 });
    }
}
