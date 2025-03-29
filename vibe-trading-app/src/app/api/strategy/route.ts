import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a trading strategy expert. Convert the user's natural language trading strategy into a structured format and generate corresponding Pine Script code for TradingView.
          
Format your response as a JSON object with the following structure:
{
  "strategy": {
    "name": "Strategy name",
    "description": "Detailed strategy description",
    "conditions": {
      "entry": ["List of entry conditions"],
      "exit": ["List of exit conditions"]
    }
  },
  "pineScript": "Generated Pine Script code"
}`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const response = completion.choices[0].message.content;
    return NextResponse.json(JSON.parse(response || "{}"));
  } catch (error) {
    console.error("Strategy processing error:", error);
    return NextResponse.json(
      { error: "Failed to process trading strategy" },
      { status: 500 }
    );
  }
}
