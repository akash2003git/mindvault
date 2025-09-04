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

    // Step 1: Get embedding for the question
    const queryEmbedding = await getEmbedding(prompt);
    if (!queryEmbedding || queryEmbedding.length === 0) {
      return res.status(500).json({ message: "Failed to generate embedding." });
    }

    // Step 2: Retrieve content
    const retrieved = await Content.aggregate([
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

    // Step 3: Filter by a relevance threshold
    const MIN_SCORE = 0.75;
    const relevantContent = retrieved.filter((doc) => doc.score >= MIN_SCORE);

    // Step 4: Build context (if any)
    const contextText = relevantContent
      .map((doc, i) => {
        const lines: string[] = [];
        if (doc.title) lines.push(`Title: ${doc.title}`);
        if (doc.description) lines.push(`Description: ${doc.description}`);
        if (doc.link) lines.push(`Link: ${doc.link}`);
        if (doc.type) lines.push(`Type: ${doc.type}`);
        return `Source ${i + 1}:\n${lines.join("\n")}`;
      })
      .join("\n\n");

    // Step 5: Decide how to call the AI
    let aiAnswer: string;
    if (relevantContent.length > 0) {
      // Normal RAG flow
      aiAnswer = await generateTextFromContext(prompt, contextText, { mode });
    } else {
      // Fallback: no context, pure knowledge
      aiAnswer = await generateTextFromContext(
        `No relevant user content was found for this question. Please answer using your own knowledge.\nQuestion: ${prompt}`,
        "",
        { mode: "context+knowledge" }, // context empty means "just answer"
      );
    }

    return res.json({
      message: "RAG query completed successfully",
      answer: aiAnswer,
      sources: relevantContent, // might be empty
      meta: {
        usedContext: relevantContent.length > 0,
        contentChecked: retrieved.length,
      },
    });
  } catch (err) {
    console.error("Error performing RAG query:", err);
    next(err);
  }
}
