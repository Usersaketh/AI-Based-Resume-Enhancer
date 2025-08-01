import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req: NextRequest) {
    try {
        const { pdfBase64, jobDescription = "General technology position", industry, experienceLevel } = await req.json();

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

        const benchmarkPrompt = `You are a senior HR expert and industry analyst with access to comprehensive industry benchmarks and salary data. Compare this resume against industry standards and top-performing resumes.

**BE CRITICAL AND DATA-DRIVEN** - Provide honest, realistic assessments based on actual market standards.

**Scoring Guidelines for Overall Score (1-100):**
- **1-30 (Poor)**: Significant gaps, poor formatting, missing key skills, entry-level with no achievements
- **31-50 (Below Average)**: Some relevant experience but lacks impact, weak achievement descriptions, formatting issues
- **51-70 (Average)**: Meets basic requirements, standard format, some achievements but not quantified well
- **71-85 (Above Average)**: Strong experience, good achievements with metrics, well-formatted, market-competitive
- **86-95 (Excellent)**: Outstanding achievements, perfect formatting, exceeds requirements, top 10% candidate
- **96-100 (Exceptional)**: Industry-leading profile, extraordinary achievements, perfect job match, top 1% candidate

**Market Competitiveness Guidelines:**
- **Low**: Basic qualifications, significant skill gaps, poor presentation
- **Medium**: Meets most requirements, some standout elements, good potential
- **High**: Exceeds requirements, strong achievements, compelling narrative

**Provide comprehensive benchmarking in JSON format:**
{
    "overallScore": "X/100",
    "scoreBreakdown": {
        "experienceRelevance": "X/20 - how relevant experience is to role",
        "achievementImpact": "X/20 - quality and quantification of achievements", 
        "skillsAlignment": "X/20 - technical and soft skills match",
        "presentationQuality": "X/20 - formatting, clarity, professionalism",
        "marketDifferentiation": "X/20 - unique value and standout elements"
    },
    "industryBenchmark": {
        "industry": "${industry}",
        "experienceLevel": "${experienceLevel}",
        "percentile": "Top X% - based on overall score and market analysis",
        "comparisonToIndustryAverage": "Above/Below/At average with specific reasoning",
        "marketDemandForProfile": "High/Medium/Low based on current trends"
    },
    "competitiveAnalysis": {
        "strengths": ["specific strength with evidence", "quantified achievement", "unique differentiator"],
        "weaknesses": ["specific gap affecting competitiveness", "missing skill for role", "presentation issue"],
        "differentiators": ["what makes this candidate unique", "standout achievement", "rare skill combination"],
        "commonGaps": ["typical missing element for this level", "industry standard not met", "improvement area"],
        "vsTopPerformers": "How this resume compares to top 10% in industry"
    },
    "salaryImpact": {
        "estimatedSalaryRange": "₹X - ₹Y LPA based on experience and skills",
        "currentMarketPosition": "Below/At/Above market rate explanation",
        "factorsInfluencingRange": ["specific skill premium", "experience multiplier", "location factor"],
        "improvementPotential": "₹X LPA increase possible with specific improvements",
        "negotiationStrength": "High/Medium/Low based on market demand"
    },
    "marketCompetitiveness": {
        "likelyToGetShortlisted": "High/Medium/Low with percentage estimate",
        "reasoningForShortlisting": "detailed explanation based on requirements match",
        "improvementsForHigherSuccess": ["specific action with expected impact", "skill to develop", "achievement to highlight"],
        "timeToHire": "Estimated weeks based on profile strength",
        "competitorAdvantages": "What other candidates might have over this profile"
    },
    "actionableRecommendations": {
        "immediate": ["fix formatting issue", "add missing keyword", "quantify achievement"],
        "shortTerm": ["skill to develop in 1-3 months", "certification to pursue", "project to undertake"],
        "longTerm": ["experience to gain in 6-12 months", "role progression path", "industry transition strategy"]
    },
    "industryTrends": {
        "emergingSkills": ["skill gaining importance", "technology trend", "methodology trend"],
        "declineAreas": ["skill losing relevance", "outdated technology", "changing practice"],
        "futureProofing": ["recommendation for staying relevant", "skill investment priority", "career pivot option"]
    }
}

**Job Description:**
${jobDescription}

**Instructions:** 
1. Analyze the resume against current industry standards and market demands
2. Use realistic salary benchmarks for the Indian market
3. BE CRITICAL - use the full 1-100 scoring range honestly
4. Consider both immediate marketability and long-term career potential
5. Provide specific, actionable insights that can drive measurable improvements
6. Factor in current market trends and future industry direction`;

        
        
        let result;
        let modelUsed = '';

        // Always use Flash model to avoid quota issues
        try {
            
            const flashModel = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
            result = await flashModel.generateContent([benchmarkPrompt, pdfPart]);
            modelUsed = 'gemini-1.5-flash';
            
        } catch (flashError: any) {
            console.error('Flash model failed for benchmarking:', flashError.message);
            throw flashError;
        }

        
        const response = await result.response;
        const generatedText = await response.text();

        let benchmark;
        try {
            const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                benchmark = JSON.parse(jsonMatch[0]);
            } else {
                throw new Error('No JSON found in response');
            }
        } catch (parseError) {
            console.error('Benchmark parsing failed:', parseError);
            return new NextResponse(
                JSON.stringify({ error: 'Failed to parse benchmark data', rawResponse: generatedText }),
                { status: 500 }
            );
        }

        return new NextResponse(
            JSON.stringify({ 
                benchmarkData: benchmark, 
                modelUsed: modelUsed 
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Benchmarking error:', error);
        return new NextResponse(
            JSON.stringify({ error: error instanceof Error ? error.message : 'Benchmarking failed' }),
            { status: 500 }
        );
    }
}
