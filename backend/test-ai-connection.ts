import dotenv from "dotenv";
dotenv.config({ debug: true });
import { getEmbedding, generateTextFromContext } from "./src/utils/aiService"; // Adjust path if you put this in a 'scripts' folder

// Ensure the AI_API_KEY is loaded
if (!process.env.AI_API_KEY) {
  console.error("Error: AI_API_KEY is not set in your .env file.");
  console.error(
    "Please add AI_API_KEY='YOUR_GOOGLE_CLOUD_API_KEY' to your .env file.",
  );
  process.exit(1); // Exit if API key is missing
}

async function runAiTests() {
  console.log("--- Starting AI API Connection Tests ---");

  // --- Test 1: getEmbedding ---
  const embeddingTestText =
    "Hello, world! This is a test sentence for embedding generation.";
  console.log(`\nTesting getEmbedding for: "${embeddingTestText}"`);
  try {
    const embedding = await getEmbedding(embeddingTestText);
    console.log("Embedding successful!");
    console.log("Embedding (first 5 values):", embedding.slice(0, 5), "...");
    console.log("Embedding dimension:", embedding.length);
    if (embedding.length === 768) {
      console.log("Embedding dimension matches expected 768.");
    } else {
      console.warn(
        `WARNING: Embedding dimension is ${embedding.length}, expected 768.`,
      );
    }
  } catch (error) {
    console.error("ERROR: getEmbedding failed.");
    console.error(error);
  }

  // --- Test 2: generateTextFromContext ---
  const textGenPrompt = "What is the capital of France?";
  const textGenContext =
    "Paris is known for its Eiffel Tower and delicious pastries. It is a major European city.";
  console.log(
    `\nTesting generateTextFromContext for prompt: "${textGenPrompt}"`,
  );
  console.log(`With context: "${textGenContext}"`);
  try {
    const generatedText = await generateTextFromContext(
      textGenPrompt,
      textGenContext,
    );
    console.log("Text generation successful!");
    console.log("Generated Text:", generatedText);
  } catch (error) {
    console.error("ERROR: generateTextFromContext failed.");
    console.error(error);
  }

  console.log("\n--- AI API Connection Tests Finished ---");
}

// Run the tests
runAiTests();
