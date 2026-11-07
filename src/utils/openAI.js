import OpenAI from "openai";
import { groqApiKey } from "./constants";

// Groq's API is OpenAI-compatible, so the openai package works with a different baseURL
const openai = new OpenAI({
  // Placeholder stops the client throwing on load when the key isn't set; requests then fail with 401
  apiKey: groqApiKey || "missing-api-key",
  baseURL: "https://api.groq.com/openai/v1",
  dangerouslyAllowBrowser: true, // key is visible in the browser; move to a backend before deploying
});

export default openai;
