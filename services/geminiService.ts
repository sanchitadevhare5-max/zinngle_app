
import { GoogleGenAI } from "@google/genai";
import { Host } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("API Key not found in process.env.API_KEY");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateChatResponse = async (
  history: { role: 'user' | 'model'; parts: { text: string }[] }[],
  userMessage: string,
  host: Host
): Promise<string> => {
  const ai = getClient();
  if (!ai) return "Error: API Key missing.";

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: `You are simulating a chat personality on the App "Zinngle". ${host.persona}. Keep responses concise (under 50 words) and conversational/engaging as if texting.`,
      },
      history: history,
    });

    const result = await chat.sendMessage({ message: userMessage });
    return result.text || "...";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "Oops! I got disconnected for a second. What did you say?";
  }
};
