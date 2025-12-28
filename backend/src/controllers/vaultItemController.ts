import * as z from "zod";
import { VaultItem } from "../models/VaultItem";
import { Tag } from "../models/Tags";
import { vaultSchema, tagSchema } from "../validators/zodSchemas";
import { Request, Response } from "express";

// Helper function to add tags and return an array of Tag IDs
async function addTags(tags: string[], userId: string) {
  const tagIds = await Promise.all(
    tags.map(async (tag) => {
      const { title } = tagSchema.parse({ title: tag });

      const existingTag = await Tag.findOne({ title, userId });
      if (existingTag) {
        return existingTag._id;
      }

      const newTag = new Tag({ title, userId });
      await newTag.save();
      return newTag._id;
    }),
  );
  return tagIds;
}

export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, description, link, type, tags } = vaultSchema.parse(
      req.body,
    );

    const tagIds = await addTags(tags ?? [], req.user!.id);

    const newItem = new VaultItem({
      title,
      description,
      link,
      type,
      tags: tagIds,
      userId: req.user!.id,
      isPublic: false,
    });
    await newItem.save();

    return res
      .status(201)
      .json({ newItem, message: "New Item added to vault successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error: ", error);
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Error while creating vault item: ", error);
    return res
      .status(500)
      .json({ message: "Server error while creating vault item.", error });
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const item = await VaultItem.findOne({
      _id: id,
      userId: req.user!.id,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found :(" });
    }

    return res.status(200).json({
      item,
      message: "Item fetched successfully!",
    });
  } catch (error) {
    console.error("Error while fetching vault item: ", error);
    return res
      .status(500)
      .json({ message: "Server error while fetching vault item.", error });
  }
};

export const getAllItems = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;

    const page = Number(req.query.pageNumber) || 1;
    const limit = Number(req.query.itemsPerPage) || 12;
    const skip = (page - 1) * limit;

    const items = await VaultItem.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalItems = await VaultItem.countDocuments({ userId });
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
    return res.status(500).json({
      message: "Server error while fetching vault items.",
      error,
    });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const { title, description, link, type, tags } = vaultSchema.parse(
      req.body,
    );

    const tagIds = await addTags(tags ?? [], req.user!.id);

    const updatedItem = await VaultItem.findOneAndUpdate(
      { _id: req.params.id, userId: req.user!.id },
      {
        title,
        description,
        link,
        type,
        tags: tagIds,
      },
      { new: true },
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found or not yours!" });
    }

    return res
      .status(200)
      .json({ updatedItem, message: "Item updated to vault successfully!" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error: ", error);
      return res.status(400).json({
        errors: error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    console.error("Error while updating vault item: ", error);
    return res
      .status(500)
      .json({ message: "Server error while updating vault item.", error });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedItem = await VaultItem.findOneAndDelete({
      _id: id,
      userId: req.user!.id,
    });

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found or not yours!" });
    }

    return res.status(200).json({
      deletedItem,
      message: "Item deleted successfully!",
    });
  } catch (error) {
    console.error("Error while deleting vault item:", error);
    return res.status(500).json({
      message: "Server error while deleting vault item.",
      error,
    });
  }
};
