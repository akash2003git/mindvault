import { Request, Response, NextFunction } from "express";
import Content from "../models/Content";
import { Types } from "mongoose";

export async function getShareableContentById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { contentId } = req.params;
    if (!Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid contend ID format" });
    }

    const content = await Content.findById(contentId).populate("tags");
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    if (content.publicStatus === false) {
      return res
        .status(403)
        .json({ message: "This content is private and cannot be shared." });
    }

    return res
      .status(200)
      .json({ message: "Content fetched successfully", content });
  } catch (error) {
    console.error(error);
    next(error);
  }
}

export async function getShareableUserContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { userId } = req.params;
    if (!Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const userPublicContent = await Content.find({
      userId: new Types.ObjectId(userId),
      publicStatus: true,
    }).populate("tags");

    if (!userPublicContent || userPublicContent.length === 0) {
      return res
        .status(404)
        .json({ message: `No public content found for user ID ${userId}` });
    }

    res.status(200).json({
      message: "Shared user content fetched successfully",
      userPublicContent,
    });
  } catch (error) {
    console.error("Error fetching shareable user content:", error);
    next(error);
  }
}

export async function importSingleContent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { contentId } = req.params;
    const { userId } = req;

    if (!Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid content ID format." });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User ID is missing." });
    }

    const original = await Content.findById(contentId);
    if (!original) {
      return res.status(404).json({ message: "Content not found." });
    }
    console.log(original);

    if (!original.publicStatus) {
      return res.status(403).json({ message: "This content is private." });
    }

    if (original.userId.toString() === userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot import your own content." });
    }

    const cloned = await Content.create({
      userId,
      title: original.title,
      link: original.link,
      type: original.type,
      description: original.description,
      tags: original.tags, // reuse global tags
      publicStatus: false, // default to private
      embedding: original.embedding,
    });

    return res
      .status(201)
      .json({ message: "Content imported successfully.", content: cloned });
  } catch (error) {
    console.error("Error importing content:", error);
    next(error);
  }
}

export async function importUserSecondBrain(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { sourceUserId } = req.params;
    const { userId } = req; // from auth middleware

    if (!Types.ObjectId.isValid(sourceUserId)) {
      return res.status(400).json({ message: "Invalid source user ID." });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Authentication failed. User ID is missing." });
    }

    if (sourceUserId === userId.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot import your own second brain." });
    }

    const publicContent = await Content.find({
      userId: new Types.ObjectId(sourceUserId),
      publicStatus: true,
    });

    if (!publicContent || publicContent.length === 0) {
      return res
        .status(404)
        .json({ message: "No public content available to import." });
    }

    const importedItems: any[] = [];

    for (const original of publicContent) {
      const cloned = await Content.create({
        userId,
        title: original.title,
        link: original.link,
        type: original.type,
        description: original.description,
        tags: original.tags,
        publicStatus: false,
        embedding: original.embedding,
      });

      importedItems.push(cloned);
    }

    return res.status(201).json({
      message: "Second brain imported successfully.",
      count: importedItems.length,
      importedItems,
    });
  } catch (error) {
    console.error("Error importing user second brain:", error);
    next(error);
  }
}
