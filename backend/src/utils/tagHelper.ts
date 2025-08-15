import Tag from "../models/Tag";
import { Types } from "mongoose";

export async function findOrCreateTagIds(
  tagTitles: string[],
): Promise<Types.ObjectId[]> {
  const tagObjectIds: Types.ObjectId[] = [];

  for (const tagTitle of tagTitles) {
    const normalizedTagName = tagTitle.toLowerCase().trim();
    if (!normalizedTagName) {
      continue; // Skip empty strings after trimming
    }

    let tag = await Tag.findOne({ title: normalizedTagName });

    if (!tag) {
      // If tag doesn't exist, try to create it
      try {
        tag = await Tag.create({ title: normalizedTagName });
      } catch (error: any) {
        // Handle the specific Mongoose duplicate key error (code 11000)
        // This can happen in a race condition (two users try to create the same new tag simultaneously)
        if (error.code === 11000) {
          // If it's a duplicate, it means another process just created it.
          // Try to find it again to get its _id.
          tag = await Tag.findOne({ title: normalizedTagName });
          if (!tag) {
            // This case is highly unlikely but a defensive check
            console.warn(
              `Race condition: Tag ${normalizedTagName} reported duplicate but not found.`,
            );
            continue; // Skip adding this tag ID
          }
        } else {
          // Re-throw other unexpected errors (e.g., DB connection issue, validation other than unique)
          // These will be caught by the calling controller's try/catch and passed to next(error)
          throw error;
        }
      }
    }

    if (tag) {
      tagObjectIds.push(tag._id);
    }
  }

  return tagObjectIds;
}
