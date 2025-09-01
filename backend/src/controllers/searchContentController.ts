import z from "zod";
import { Request, Response, NextFunction } from "express";
import Content from "../models/Content";
import { searchSchema } from "../validations/zodSchemas";
import { Types } from "mongoose";
import { getEmbedding } from "../utils/aiService";

// TL;DR: How the Search Works
// Incoming request → { query, limit?, mode }
// Validated via Zod.
// If mode = semantic → convert query → embedding → vector search.
// If mode = keyword → use text search with fuzzy matching and scoring boosts.
// Both return relevant fields and scores.
// Both are filtered by user (so users only see their own saved content).

export async function searchContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // --- Zod validation ---
    const validationResult = searchSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      });
    }

    const { query, limit = 10, mode } = validationResult.data;
    const { userId } = req;

    let results;

    // Common projections
    const commonProjectFields = {
      _id: 1,
      title: 1,
      description: 1,
      type: 1,
      tags: 1,
      publicStatus: 1,
      link: 1,
      metadata: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    const tagsLookupStage = {
      $lookup: {
        from: "tags",
        localField: "tags",
        foreignField: "_id",
        as: "tags",
      },
    };

    if (mode === "semantic") {
      const queryEmbedding = await getEmbedding(query);

      if (!queryEmbedding || queryEmbedding.length === 0) {
        return res
          .status(500)
          .json({ message: "Failed to generate embedding for search query." });
      }

      results = await Content.aggregate([
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
            ...commonProjectFields,
            score: { $meta: "vectorSearchScore" },
          },
        },
        tagsLookupStage,
      ]);
    } else if (mode === "keyword") {
      results = await Content.aggregate([
        {
          $search: {
            index: "keyword_index",
            compound: {
              should: [
                {
                  text: {
                    query,
                    path: "title",
                    score: { boost: { value: 3 } },
                    fuzzy: { maxEdits: 1, prefixLength: 2 },
                  },
                },
                {
                  text: {
                    query,
                    path: "description",
                    score: { boost: { value: 1 } },
                    fuzzy: { maxEdits: 1, prefixLength: 2 },
                  },
                },
              ],
            },
          },
        },
        {
          $match: { userId: new Types.ObjectId(userId) },
        },
        { $limit: limit },
        {
          $project: {
            ...commonProjectFields,
            score: { $meta: "searchScore" },
          },
        },
        tagsLookupStage,
      ]);
    }

    return res.json({
      message: "Search completed successfully",
      results,
    });
  } catch (error) {
    console.error("Error searching content:", error);
    next(error);
  }
}
