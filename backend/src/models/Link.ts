import { Schema, model, Document, Types } from "mongoose";

enum ShareType {
  single = "single",
  collection = "collection",
}

export interface ILink {
  hash: string;
  userId: Types.ObjectId;
  contentId: Types.ObjectId | null;
  type: ShareType;
}

export interface ILinkDocument extends ILink, Document {}

const linkSchema = new Schema<ILinkDocument>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    contentId: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    type: {
      type: String,
      enum: Object.values(ShareType),
      required: true,
    },
  },
  { timestamps: true },
);

export const Link = model<ILinkDocument>("Link", linkSchema);
