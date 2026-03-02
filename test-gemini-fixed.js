const { GoogleGenAI } = require("@google/genai");

async function testChat() {
    const apiKey = "AIzaSyA9CQKPSyS8SLhFtAiePVHXkheAPI64kOA"; // From .env.local
    const ai = new GoogleGenAI({ apiKey });

    console.log("Testing with direct ai.generateContent and gemini-1.5-flash...");
    try {
        const res = await ai.generateContent({
            model: "gemini-1.5-flash",
            contents: [{ role: "user", parts: [{ text: "Hi" }] }],
        });
        console.log("Success (1.5):", res.text);
    } catch (e) {
        console.error("Failed (1.5):", e.message || e);
    }
}

testChat();
