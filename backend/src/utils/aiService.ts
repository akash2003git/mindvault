// src/utils/aiService.ts
import {
  AI_API_KEY,
  AI_API_URL,
  EMBEDDING_MODEL_NAME,
  GEMINI_TEXT_MODEL_NAME,
} from "../config/env";

const MAX_RETRIES = 5;
const INITIAL_BACKOFF_DELAY = 1000; // 1 second

/**
 * Implements exponential backoff for API calls.
 * @param fn The function to retry.
 * @param retries Remaining retries.
 * @param delay Current delay.
 */
async function exponentialBackoff<T>(
  fn: () => Promise<T>,
  retries: number,
  delay: number,
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    console.error(
      `Attempt failed. Retries left: ${retries}. Delay: ${delay}ms. Error:`,
      error.message,
    );
    if (retries > 0 && (error.status === 429 || error.status >= 500)) {
      await new Promise((res) => setTimeout(res, delay));
      return exponentialBackoff(fn, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Generates an embedding for a given text using a dedicated embedding model.
 * @param text The input text to embed.
 * @returns A Promise that resolves to an array of numbers (the embedding vector).
 */
export async function getEmbedding(text: string): Promise<number[]> {
  if (!AI_API_KEY) {
    console.warn("AI_API_KEY is not set. Cannot generate embedding.");
    return [];
  }

  const payload = {
    model: EMBEDDING_MODEL_NAME,
    content: {
      parts: [{ text }],
    },
  };

  const callApi = async () => {
    const response = await fetch(
      `${AI_API_URL}/${EMBEDDING_MODEL_NAME}:embedContent?key=${AI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `Embedding API call failed with status ${response.status}: ${JSON.stringify(errorBody)}`,
      );
    }

    const result = await response.json();

    if (
      result.embedding &&
      result.embedding.values &&
      Array.isArray(result.embedding.values)
    ) {
      return result.embedding.values;
    } else {
      console.error(
        "Unexpected embedding API response structure:",
        JSON.stringify(result, null, 2),
      );
      throw new Error(
        "Failed to get embedding. Unexpected response structure.",
      );
    }
  };

  return exponentialBackoff(callApi, MAX_RETRIES, INITIAL_BACKOFF_DELAY);
}

/**
 * Generates text based on a prompt and optional context using the Gemini API.
 * @param prompt The user's question or instruction.
 * @param context Optional context text to guide the AI's response.
 * @returns A Promise that resolves to the generated text.
 */
export async function generateTextFromContext(
  prompt: string,
  context: string = "",
  options: { mode?: "context-only" | "context+knowledge" } = {},
): Promise<string> {
  if (!AI_API_KEY) {
    console.warn("AI_API_KEY is not set. Cannot generate text.");
    return "AI feature is not configured. Please provide an API key.";
  }

  const chatHistory = [];
  const mode = options.mode || "context+knowledge"; // default strict

  let fullPrompt = prompt;
  if (context) {
    if (mode === "context-only") {
      fullPrompt = `Answer the question strictly using the provided context.
  If the context does not contain enough information, respond with
  "The context does not provide this information."

  Use reasoning if the context implies the answer.

  Context:
  ${context}

  Question: ${prompt}`;
    } else if (mode === "context+knowledge") {
      fullPrompt = `Answer the following question. 
      If the context provides relevant details, use them. 
      If not, use your own knowledge.

      Context:
      ${context}

      Question: ${prompt}`;
    }
  }

  chatHistory.push({ role: "user", parts: [{ text: fullPrompt }] });

  const payload = { contents: chatHistory };

  const callApi = async () => {
    const response = await fetch(
      `${AI_API_URL}/${GEMINI_TEXT_MODEL_NAME}:generateContent?key=${AI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const errorBody = await response.json();
      throw new Error(
        `Text generation API call failed with status ${response.status}: ${JSON.stringify(errorBody)}`,
      );
    }

    const result = await response.json();
    if (
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      return result.candidates[0].content.parts[0].text;
    } else {
      console.error(
        "Unexpected text generation API response structure:",
        JSON.stringify(result, null, 2),
      );
      throw new Error("Failed to get text from AI. Unexpected response.");
    }
  };

  return exponentialBackoff(callApi, MAX_RETRIES, INITIAL_BACKOFF_DELAY);
}

export interface embeddableContentObj {
  title?: string;
  type?: string;
  description?: string;
  tags?: string[];
}

export async function generateContentEmbedding(
  content: embeddableContentObj,
): Promise<number[]> {
  const parts: string[] = [];

  if (content.title) parts.push(content.title);
  if (content.description) parts.push(content.description);
  if (content.type) parts.push(`Type: ${content.type}`);
  if (content.tags) {
    const tagString = content.tags.join(", ");
    parts.push(`Tags: ${tagString}`);
  }

  const textForEmbedding = parts.join(". ");
  // console.log(textForEmbedding);
  return await getEmbedding(textForEmbedding);
}
