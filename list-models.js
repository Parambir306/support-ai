const { GoogleGenAI } = require("@google/genai");

async function listModels() {
    const apiKey = "AIzaSyA9CQKPSyS8SLhFtAiePVHXkheAPI64kOA"; // From .env.local
    const ai = new GoogleGenAI({ apiKey });

    console.log("Listing models...");
    try {
        // Many libraries have some way to list models or we can try a few standard ones
        // But wait, if it's the NEW SDK, maybe it's different.
        // Let's check the keys in the ai object.
        console.log("AI Keys:", Object.keys(ai));
        if (ai.models) console.log("AI.models Keys:", Object.keys(ai.models));

        // Try a standard one again with different casing or prefix
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-2.0-flash-exp"];
        for (const m of models) {
            try {
                const res = await ai.models.generateContent({
                    model: m,
                    contents: "test",
                });
                console.log(`Success with ${m}`);
                break;
            } catch (e) {
                console.log(`Failed with ${m}: ${e.message}`);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

listModels();
