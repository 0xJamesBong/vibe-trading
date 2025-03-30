import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for strategy understanding
const STRATEGY_ANALYSIS_PROMPT = `You are an expert trading strategy analyst. Your task is to:
1. Understand the trading strategy described by the user
2. Break it down into key components:
   - Entry conditions
   - Exit conditions
   - Risk management rules
   - Position sizing rules
3. Identify the required technical indicators and data points
4. Determine the appropriate timeframe and trading pairs

IMPORTANT: Your response must be a valid JSON object with the following structure:
{
  "entryConditions": string[],
  "exitConditions": string[],
  "riskManagement": string[],
  "positionSizing": string[],
  "indicators": string[],
  "timeframe": string,
  "tradingPairs": string[]
}`;

// System prompt for Pine Script generation
const PINESCRIPT_PROMPT = `You are an expert Pine Script developer. Your task is to:
1. Convert the analyzed strategy into Pine Script code
2. Implement proper error handling and validation
3. Add performance metrics and risk management
4. Include clear documentation and comments

The code should be production-ready and follow Pine Script best practices.`;

// System prompt for contract interaction generation
const CONTRACT_PROMPT = `You are an expert Solana smart contract developer. Your task is to:
1. Generate the necessary contract interactions for Kamino and Jupiter
2. Implement proper error handling and transaction management
3. Include position sizing and risk management
4. Add clear documentation and comments

The code should be production-ready and follow Solana best practices.`;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Step 1: Strategy Analysis
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: STRATEGY_ANALYSIS_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    const analysisContent = analysisResponse.choices[0]?.message?.content;
    if (!analysisContent) {
      throw new Error("No content received from OpenAI");
    }

    console.log("🌟 analysisResponse:", analysisResponse);
    console.log("🌟 analysisContent:", analysisContent);
    
    let strategyAnalysis;
    try {
      strategyAnalysis = JSON.parse(analysisContent);
    } catch (error) {
      console.error("Error parsing analysis content:", error);
      throw new Error("Failed to parse strategy analysis as JSON");
    }
    console.log("🌟 strategyAnalysis:", strategyAnalysis);

    // Step 2: Pine Script Generation
    const pineScriptResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: PINESCRIPT_PROMPT },
        { role: "user", content: JSON.stringify(strategyAnalysis) }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const pineScript = pineScriptResponse.choices[0]?.message?.content;
    if (!pineScript) {
      throw new Error("No Pine Script content received from OpenAI");
    }

    // Step 3: Contract Interaction Generation
    const contractResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: CONTRACT_PROMPT },
        { role: "user", content: JSON.stringify(strategyAnalysis) }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const contractCode = contractResponse.choices[0]?.message?.content;
    if (!contractCode) {
      throw new Error("No contract code received from OpenAI");
    }

    return NextResponse.json({
      analysis: strategyAnalysis,
      pineScript,
      contractCode,
    });
  } catch (error) {
    console.error("Error in strategy generation:", error);
    return NextResponse.json(
      { error: "Failed to generate strategy" },
      { status: 500 }
    );
  }
}
