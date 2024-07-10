import { type NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });

    const body = await req.json();

    const prompt = `As a Poet Laureate, analyze this poem: ${body.data.poetry}`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const analysis = chatCompletion.choices;

    return NextResponse.json({ analysis: analysis }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
