const { GoogleGenAI } = require("@google/genai");

async function testWithModels() {
    const apiKey = "AIzaSyA9CQKPSyS8SLhFtAiePVHXkheAPI64kOA";
    const ai = new GoogleGenAI({ apiKey });
    
    const models = ["gemini-2.5-flash", "gemini-1.5-flash", "models/gemini-2.5-flash"];
    
    for (const m of models) {
        console.log(`--- Testing model: ${m} ---`);
        try {
            const start = Date.now();
            const res = await ai.models.generateContent({
                model: m,
                contents: "Hello",
            });
            console.log(`Status: SUCCESS in ${Date.now() - start}ms`);
            console.log(`Response: ${res.text.substring(0, 50)}...`);
        } catch (e) {
            console.log(`Status: FAILED`);
            console.log(`Error Name: ${e.name}`);
            console.log(`Error Message: ${e.message}`);
            if (e.status) console.log(`Error Status: ${e.status}`);
        }
        console.log("");
    }
}

testWithModels();
