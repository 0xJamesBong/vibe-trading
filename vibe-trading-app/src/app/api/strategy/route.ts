import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface StrategyResponse {
  strategy: {
    name: string;
    description: string;
    conditions: {
      entry: string[];
      exit: string[];
    };
  };
  pineScript: string;
}

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a helpful trading assistant with expertise in trading strategies and technical analysis. You can engage in general conversation and provide advice, but when users ask about specific trading strategies, you should respond in a structured JSON format.

For general questions, chitchat, or debugging help, respond naturally in plain text.

For trading strategy requests, respond with this exact JSON structure:
{
  "strategy": {
    "name": "Strategy name",
    "description": "Detailed strategy description",
    "conditions": {
      "entry": ["List of entry conditions"],
      "exit": ["List of exit conditions"]
    }
  },
  "pineScript": "Generated Pine Script code",
  "thoughts": "Additional thoughts or considerations"
}

Guidelines:
1. For general questions or casual conversation, respond naturally without JSON formatting
2. For strategy requests, always use the JSON structure above
3. Be helpful and friendly in both modes
4. When in doubt, respond naturally rather than forcing a strategy format`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = completion.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    // Try to parse as JSON first
    try {
      const cleanContent = content.trim().replace(/```json\n?|\n?```/g, '');
      const parsedResponse = JSON.parse(cleanContent) as StrategyResponse;
      
      // If it's a valid strategy response, return it as is
      if (parsedResponse.strategy && parsedResponse.pineScript) {
        return NextResponse.json(parsedResponse);
      }
      
      // If it's not a valid strategy response, return it as a regular response
      return NextResponse.json({ response: content });
    } catch (parseError) {
      // If it's not JSON, return it as a regular response
      return NextResponse.json({ response: content });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
