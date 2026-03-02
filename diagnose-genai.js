const { GoogleGenAI } = require("@google/genai");

async function diagnose() {
    const apiKey = "AIzaSyA9CQKPSyS8SLhFtAiePVHXkheAPI64kOA";
    const ai = new GoogleGenAI({ apiKey });

    console.log("--- Diagnosing gemini-2.5-flash ---");
    try {
        const res = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: "Say 'Hello, I am working'",
        });
        console.log("Full response keys:", Object.keys(res));
        console.log("Response text:", res.text);
    } catch (e) {
        console.error("Diagnosis failed:", e.message || e);
        if (e.status) console.log("Status:", e.status);
    }
}

diagnose();
