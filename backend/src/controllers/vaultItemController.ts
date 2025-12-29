import * as z from "zod";
import { VaultItem } from "../models/VaultItem";
import { Tag } from "../models/Tags";
import { vaultSchema, tagSchema } from "../validators/zodSchemas";
import { Request, Response } from "express";
import { Types } from "mongoose";

// Helper function to add tags and return an array of Tag IDs
async function addTags(tags: string[], userId: string) {
  const tagIds: Types.ObjectId[] = [];

  for (const tag of tags) {
    const { title } = tagSchema.parse({ title: tag });
    let existingTag = await Tag.findOne({ title, userId });
    if (!existingTag) {
      existingTag = await Tag.create({ title, userId });
    }
    tagIds.push(existingTag._id);
  }

  return tagIds;
}

export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, description, link, type, tags } = vaultSchema.parse(req.body);

    const tagIds = tags?.length ? await addTags(tags, req.user!.id) : [];

    const newItem = await VaultItem.create({
      title,
      description,
      link,
      type,
      tags: tagIds,
      userId: req.user!.id,
      isPublic: false,
    });

    const populatedItem = await VaultItem.findById(newItem._id).populate("tags", "title _id");

    return res.status(201).json({
      newItem: populatedItem,
      message: "New Item added to vault successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.error("Error while creating vault item: ", error);
    return res.status(500).json({ message: "Server error while creating vault item." });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const item = await VaultItem.findOne({
      _id: id,
      userId: req.user!.id,
    }).populate("tags", "title _id");

    if (!item) {
      return res.status(404).json({ message: "Item not found :(" });
    }

    return res.status(200).json({
      item,
      message: "Item fetched successfully!",
    });
  } catch (error) {
    console.error("Error while fetching vault item: ", error);
    return res.status(500).json({ message: "Server error while fetching vault item." });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const query: any = { userId };

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.tags && typeof req.query.tags === "string") {
      const tagNames = req.query.tags.split(",").map((t) => t.trim());

      const userTags = await Tag.find({
        userId: req.user!.id,
        title: { $in: tagNames }
      }).select("_id");

      const tagIds = userTags.map((t) => t._id);

      query.tags = { $all: tagIds };
    }


    if (req.query.search && typeof req.query.search === "string") {
      const searchRegex = { $regex: req.query.search.trim(), $options: "i" };
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
      ];
    }

    const page = Math.max(1, Number(req.query.pageNumber) || 1);
    const limit = Math.max(1, Math.min(100, Number(req.query.itemsPerPage) || 12));
    const skip = (page - 1) * limit;

    const [items, totalItems] = await Promise.all([
      VaultItem.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("tags", "title _id")
        .lean(),
      VaultItem.countDocuments(query),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      items,
      page,
      limit,
      totalItems,
      totalPages,
    });
  } catch (error) {
    console.error("Error while fetching vault items:", error);
    return res.status(500).json({ message: "Server error while fetching vault items." });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const { title, description, link, type, tags } = vaultSchema.parse(req.body);

    const tagIds = await addTags(tags ?? [], req.user!.id);

    const updatedItem = await VaultItem.findOneAndUpdate(
      { _id: id, userId: req.user!.id },
      {
        title,
        description,
        link,
        type,
        tags: tagIds,
      },
      { new: true, runValidators: true },
    ).populate("tags", "title _id");

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found or not yours!" });
    }

    return res.status(200).json({
      updatedItem,
      message: "Item updated successfully!",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }
    console.error("Error while updating vault item: ", error);
    return res.status(500).json({ message: "Server error while updating vault item." });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id as string)) {
      return res.status(400).json({ message: "Invalid item ID" });
    }

    const deletedItem = await VaultItem.findOneAndDelete({
      _id: id,
      userId: req.user!.id,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found or not yours!" });
    }

    return res.status(200).json({
      message: "Item deleted successfully!",
    });
  } catch (error) {
    console.error("Error while deleting vault item:", error);
    return res.status(500).json({ message: "Server error while deleting vault item." });
  }
};
