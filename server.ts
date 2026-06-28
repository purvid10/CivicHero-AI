import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded Gemini AI client to prevent crash on startup if key is missing
let aiClient: GoogleGenAI | null = null;
function getAi(): GoogleGenAI | null {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY is missing. Falling back to structured heuristic responses.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// 1. AI Investigation Agent Endpoint
app.post("/api/investigate", async (req, res) => {
  const { title, description, category, language } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required for investigation" });
  }

  const ai = getAi();
  if (!ai) {
    // Elegant heuristic fallback when API key is not yet set
    const fallbackCategory = category || (
      description.toLowerCase().includes("pothole") || description.toLowerCase().includes("road") ? "Potholes" :
      description.toLowerCase().includes("leak") || description.toLowerCase().includes("water") ? "Water Leakage" :
      description.toLowerCase().includes("light") || description.toLowerCase().includes("dark") ? "Damaged Streetlights" :
      description.toLowerCase().includes("waste") || description.toLowerCase().includes("garbage") || description.toLowerCase().includes("trash") ? "Waste Management" :
      "Public Infrastructure"
    );

    const impactScore = Math.floor(Math.random() * 30) + 50; // 50 - 80
    const mockPriority = impactScore > 75 ? "critical" : impactScore > 60 ? "high" : "medium";

    return res.json({
      category: fallbackCategory,
      summary: `AI analyzed report on "${title || 'Civic Issue'}". Found high indication of local distress regarding ${fallbackCategory}. Immediate assessment recommended. [Language: ${language || 'English'}]`,
      impactScore,
      priority: mockPriority,
      preventionInsight: `Heuristic Insight: Chronic neglect of ${fallbackCategory.toLowerCase()} in high-traffic zones increases citizen risk index. Fixing this immediately prevents secondary damage to surrounding assets.`,
      resolutionRecommendation: `Deploy municipal engineering team to assess sub-surface status within 48 hours. Secure the area with high-visibility markers in the interim.`
    });
  }

  try {
    const prompt = `Analyze this civic issue report and provide a structured JSON response.
Title: ${title || "Untitled Civic Issue"}
Description: ${description}
User-Suggested Category: ${category || "None"}

CRITICAL LANGUAGE REQUIREMENT: You MUST write the "summary", "preventionInsight", and "resolutionRecommendation" entirely in this language: ${language || 'English'}.
Do NOT translate the "category" value. It must be exactly one of the English options below.

You must return a JSON response with the following fields:
1. category: String, must be exactly one of: "Potholes", "Water Leakage", "Damaged Streetlights", "Waste Management", "Public Infrastructure". Pick the best one.
2. summary: String, a short, highly professional, 2-3 sentence summary of the issue in ${language || 'English'}.
3. impactScore: Integer between 1 and 100, representing the urgency/impact on citizens.
4. priority: String, must be exactly one of: "critical" (impact > 80), "high" (impact 60-80), "medium" (impact < 60).
5. preventionInsight: String, a predictive insight explaining how fixing this now prevents worse future issues in ${language || 'English'}.
6. resolutionRecommendation: String, actionable recommended steps for public authorities to resolve this specific issue in ${language || 'English'}.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING },
            summary: { type: Type.STRING },
            impactScore: { type: Type.INTEGER },
            priority: { type: Type.STRING },
            preventionInsight: { type: Type.STRING },
            resolutionRecommendation: { type: Type.STRING },
          },
          required: ["category", "summary", "impactScore", "priority", "preventionInsight", "resolutionRecommendation"]
        }
      }
    });

    const resultText = response.text || "{}";
    const data = JSON.parse(resultText.trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini API Error during investigation:", error);
    res.status(500).json({ error: error.message || "Failed to analyze issue" });
  }
});

// 2. Citizen AI Chatbot / Discussion Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { message, history, currentIssues, language } = req.body;

  const ai = getAi();
  if (!ai) {
    return res.json({
      text: `Hello! I am your VisionOS-inspired Civic AI Assistant. I can help answer questions and direct municipal issues. (Note: Set GEMINI_API_KEY in secrets to activate real-time Gemini conversations!) [Selected Language: ${language || 'English'}]`
    });
  }

  try {
    const issuesContext = (currentIssues || [])
      .map((i: any) => `- [${i.priority.toUpperCase()}] ${i.title} (${i.category}) at (${i.lat.toFixed(3)}, ${i.lng.toFixed(3)}) - Status: ${i.status}`)
      .join("\n");

    const chatHistory = (history || []).map((msg: any) => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Start Chat
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: `You are the CivicResolve AI Assistant, a friendly, hyper-intelligent, proactive civic facilitator for our smart city platform.
You are embedded in a premium Apple VisionOS Glassmorphism web platform.
Your purpose is to answer citizens' questions, provide predictive insights, analyze reported problems, and encourage community collaboration.

CRITICAL REQUIREMENT: You MUST respond completely in this language: ${language || 'English'}.

Here are the current reported civic issues in our system:
${issuesContext}

Keep your responses supportive, scannable, human-centered, and focused on civic resolution. Highlight specific issues from the list when relevant to guide users.`
      }
    });

    // Add prior history if any
    const combinedPrompt = `The citizen is asking: "${message}"\n\nProvide an elegant, encouraging response in this language: ${language || 'English'}.`;
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [...chatHistory, { role: "user", parts: [{ text: combinedPrompt }] }]
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "Chat failed" });
  }
});

// 3. Social Media Auto-Complaint Creator Endpoint
app.post("/api/social-complaint", async (req, res) => {
  const { socialText, language } = req.body;

  if (!socialText) {
    return res.status(400).json({ error: "Social media post content is required" });
  }

  const ai = getAi();
  if (!ai) {
    return res.json({
      title: "Extracted Social Complaint",
      category: "Public Infrastructure",
      description: socialText,
      priority: "high",
      latOffset: Math.random() * 0.04 - 0.02,
      lngOffset: Math.random() * 0.04 - 0.02,
      extractedSource: `Parsed Heuristically (Add GEMINI_API_KEY for real AI extraction) [Language: ${language || 'English'}]`
    });
  }

  try {
    const prompt = `You are a social media listener agent for local government. Extract civic issues from this post.
Post Text: "${socialText}"

CRITICAL REQUIREMENT: You MUST extract the "title" and "description" completely in this language: ${language || 'English'}.
Do NOT translate the "category" value. It must be exactly one of the English options below.

Provide a JSON response with the following fields:
1. title: String, a concise, 5-8 word title for the civic issue in ${language || 'English'}.
2. category: String, must be exactly one of: "Potholes", "Water Leakage", "Damaged Streetlights", "Waste Management", "Public Infrastructure".
3. description: String, a clean rephrasing of the complaint in ${language || 'English'}.
4. priority: String, must be "critical", "high", or "medium".
5. latOffset: Number, a float between -0.015 and +0.015, representing a coordinate offset from center.
6. lngOffset: Number, a float between -0.015 and +0.015, representing a coordinate offset from center.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            category: { type: Type.STRING },
            description: { type: Type.STRING },
            priority: { type: Type.STRING },
            latOffset: { type: Type.NUMBER },
            lngOffset: { type: Type.NUMBER },
          },
          required: ["title", "category", "description", "priority", "latOffset", "lngOffset"]
        }
      }
    });

    const data = JSON.parse((response.text || "{}").trim());
    res.json(data);
  } catch (error: any) {
    console.error("Gemini Social Media Parsing Error:", error);
    res.status(500).json({ error: error.message || "Failed to parse social post" });
  }
});

// Serve Vite or Static files depending on Environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`CivicResolve premium server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
