import { Request, Response, NextFunction } from "express";
import Content from "../models/Content";
import { Types } from "mongoose";
import { getEmbedding, generateTextFromContext } from "../utils/aiService";

export async function ragQuery(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { prompt, limit = 5, mode = "context+knowledge" } = req.body;
    const { userId } = req;

    if (!prompt) {
      return res.status(400).json({ message: "Prompt is required." });
    }

    // Step 1. Generate embedding for the prompt
    const queryEmbedding = await getEmbedding(prompt);
    if (!queryEmbedding || queryEmbedding.length === 0) {
      return res.status(500).json({ message: "Failed to generate embedding." });
    }

    // Step 2. Retrieve relevant documents (vector search)
    const relevantContent = await Content.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit,
          filter: {
            userId: new Types.ObjectId(userId),
          },
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          link: 1,
          type: 1,
          score: { $meta: "vectorSearchScore" },
        },
      },
    ]);

    // Step 3. Combine retrieved docs into context text
    const contextText = relevantContent
      .map((doc, i) => {
        const parts: string[] = [];
        if (doc.title) parts.push(`Title: ${doc.title}`);
        if (doc.description) parts.push(`Description: ${doc.description}`);
        if (doc.link) parts.push(`Link: ${doc.link}`);
        if (doc.type) parts.push(`Type: ${doc.type}`);
        return `Result ${i + 1}: ${parts.join("\n")}`;
      })
      .join("\n\n");

    // Step 4. Generate AI response with context
    const aiAnswer = await generateTextFromContext(prompt, contextText, {
      mode,
    });

    // Step 5. Return AI answer + supporting content
    return res.json({
      message: "RAG query completed successfully",
      answer: aiAnswer,
      sources: relevantContent,
    });
  } catch (error) {
    console.error("Error performing RAG query:", error);
    next(error);
  }
}
