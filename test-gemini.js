const { GoogleGenAI } = require("@google/genai");

async function testChat() {
    const apiKey = "AIzaSyA9CQKPSyS8SLhFtAiePVHXkheAPI64kOA"; // From .env.local
    const ai = new GoogleGenAI({ apiKey });

    console.log("Testing with gemini-2.5-flash...");
    try {
        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Hi",
        });
        console.log("Success (2.5):", res.text);
    } catch (e) {
        console.error("Failed (2.5):", e.message || e);
    }

    console.log("\nTesting with gemini-1.5-flash...");
    try {
        const res = await ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: "Hi",
        });
        console.log("Success (1.5):", res.text);
    } catch (e) {
        console.error("Failed (1.5):", e.message || e);
    }
}

testChat();
