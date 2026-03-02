const genai = require("@google/genai");

console.log("Top level exports:", Object.keys(genai));

const apiKey = "AIzaSyA9CQKPSyS8SLhFtAiePVHXkheAPI64kOA";
const ai = new genai.GoogleGenAI({ apiKey });

console.log("AI instance keys:", Object.keys(ai));
if (ai.models) console.log("AI.models keys:", Object.keys(ai.models));

// Try to find where generateContent is
function findMethod(obj, name, path = "ai") {
    if (!obj || typeof obj !== 'object') return;
    if (obj[name] && typeof obj[name] === 'function') {
        console.log(`Found ${name} at ${path}.${name}`);
    }
    for (let key of Object.keys(obj)) {
        if (key !== 'models' || path === "ai") { // avoid infinite or too deep
            findMethod(obj[key], name, `${path}.${key}`);
        }
    }
}

findMethod(ai, "generateContent");
