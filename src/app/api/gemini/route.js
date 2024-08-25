import {NextResponse} from "next/server";
import {GoogleGenerativeAI} from "@google/generative-ai";
import Groq from "groq-sdk";
const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// async function run() {
//   const model = genAI.getGenerativeModel({
//     model: "gemini-1.5-flash",
//     // tools: [""],
//   });
//   const result = await model.generateContent(["What is the latest news?"]);
//   console.log(result.response.text());
// }

async function run() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion.choices[0]?.message?.content || "";
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that can answer questions and provide information. If you are asked realtime data you may search the web for the answer.",
      },
      {
        role: "user",
        content: "What is today's weather in kolkata?",
      },
    ],
    model: "llama3-8b-8192",
    // tools: ["DuckDuckGo()"],
  });
}
export function GET() {
  //   console.log(process.env.GEMINI_API_KEY);
  //   run();
  return NextResponse.json({message: "Hello, world!"});
}

export async function POST() {
  const res = await run();
  console.log(res);

  return NextResponse.json({res: res});
}
