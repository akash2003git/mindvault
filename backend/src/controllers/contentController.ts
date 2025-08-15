import { Request, Response, NextFunction } from "express";
import Content from "../models/Content";
import { contentSchema } from "../validations/zodSchemas";
import z from "zod";
import { findOrCreateTagIds } from "../utils/tagHelper";
import { Types } from "mongoose";

export async function addContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Zod validation
    const validationResult = contentSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      });
    }
    const {
      title,
      link,
      type,
      description,
      tags,
      publicStatus,
      metadata,
      embedding,
    } = validationResult.data;

    const { userId } = req;
    const tagIdArr = await findOrCreateTagIds(tags);

    const newContent = await Content.create({
      userId,
      title,
      link,
      type,
      description,
      tags: tagIdArr,
      publicStatus,
      metadata,
      embedding,
    });

    res
      .status(201)
      .json({ message: "Content added successfully!", newContent });
  } catch (error) {
    console.error("Error while adding content:", error);
    next(error);
  }
}

export async function getContentById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { userId } = req;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }

    const content = await Content.findById(id).populate("tags");
    if (!content) {
      return res
        .status(404)
        .json({ message: `Content with id ${id} not found!` });
    }
    if (
      userId !== content.userId.toString() &&
      content.publicStatus === false
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this content" });
    }

    return res.status(200).json(content);
  } catch (error) {
    console.error("Error fetching content:", error);
    next(error);
  }
}

export async function getContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req;
    const userContent = await Content.find({ userId }).populate("tags");
    res
      .status(200)
      .json({ message: "Content fetched successfully", userContent });
  } catch (error) {
    console.error("Error fetching content:", error);
    next(error);
  }
}

export async function updateContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    // Zod validation
    const validationResult = contentSchema.partial().safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: z.flattenError(validationResult.error).fieldErrors,
      });
    }

    const updates = validationResult.data;

    const { id } = req.params;
    const { userId } = req;
    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }
    const targetContent = await Content.findById(id);
    if (!targetContent) {
      return res
        .status(404)
        .json({ message: `Content with id ${id} not found` });
    }
    if (userId !== targetContent.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this content" });
    }

    // Update tags
    if (updates.tags && Array.isArray(updates.tags)) {
      targetContent.tags = await findOrCreateTagIds(updates.tags);
      delete updates.tags;
    }

    Object.assign(targetContent, updates);
    await targetContent.save();
    res.status(200).json({
      message: "Content updated successfully",
      updatedContent: targetContent,
    });
  } catch (error) {
    console.error("Error updating content:", error);
    next(error); // Pass error to global error handler
  }
}

export async function deleteContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;
    const { userId } = req;

    if (!Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid content ID format" });
    }

    const content = await Content.findById(id);
    if (!content) {
      return res
        .status(404)
        .json({ message: `Content with id ${id} not found!` });
    }
    if (userId !== content.userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this content" });
    }

    await Content.findByIdAndDelete(id);
    res.status(200).json({ message: "Content deleted successfully!" });
  } catch (error) {
    console.error("Error deleting content:", error);
    next(error);
  }
}
