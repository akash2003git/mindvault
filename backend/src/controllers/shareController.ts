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
