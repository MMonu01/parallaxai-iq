import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

export const GeminiAi = (text) => {
  const genAI = new GoogleGenerativeAI(process.env.gemini_api_key);

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  return model.generateContent([text]);
};
