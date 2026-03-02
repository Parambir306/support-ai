import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json()
        console.log(`[api/chat] Message: "${message}", ownerId: ${ownerId}`);

        if (!message || !ownerId) {
            return NextResponse.json(
                { message: "message and owner id is required" },
                { status: 400 }
            )
        }
        await connectDb()
        const setting = await Settings.findOne({ ownerId })
        if (!setting) {
            console.log(`[api/chat] Settings not found for ownerId: ${ownerId}`);
            return NextResponse.json(
                { message: "chat bot is not configured yet." },
                { status: 400 }
            )
        }

        const KNOWLEDGE = `
        business name- ${setting.businessName || "not provided"}
        supportEmail- ${setting.supportEmail || "not provided"}
        knowledge- ${setting.knowledge || " not provided"}
        `


        const prompt = `
You are a professional customer support assistant for this business.

Use ONLY the information provided below to answer the customer's question.
You may rephrase, summarize, or interpret the information if needed.
Do NOT invent new policies, prices, or promises.



--------------------
BUSINESS INFORMATION
--------------------
${KNOWLEDGE}

--------------------
CUSTOMER QUESTION
--------------------
${message}

--------------------
ANSWER
--------------------
`;

        console.log(`[api/chat] Generating content with gemini-2.5-flash for owner: ${ownerId}...`);
        const aiStart = Date.now();
        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
        console.log(`[api/chat] AI Response generated in ${Date.now() - aiStart}ms`);

        const response = NextResponse.json(res.text)
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");
        return response

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("[api/chat] ERROR:", errorMessage);
        const response = NextResponse.json(
            { message: `chat error: ${errorMessage}` },
            { status: 500 }
        )
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");
        return response
    }
}

export const OPTIONS = async () => {
    return NextResponse.json(null, {
        status: 201,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        }
    })
}