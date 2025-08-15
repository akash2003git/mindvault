import { Request, Response, NextFunction } from "express";
import Tag from "../models/Tag";

export async function getTags(req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await Tag.find({});
    return res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    next(error);
  }
}

export async function getTagById(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tagId = req.params.id;
    const tag = await Tag.findById(tagId);
    if (!tag) return res.status(404).json({ message: "Tag not found" });
    res.status(200).json(tag.title);
  } catch (error) {
    console.error(`Error fetching tag with id ${req.params.id}:`, error);
    next(error);
  }
}
