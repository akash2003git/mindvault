import { Schema, model, Document, Types } from "mongoose";

export enum ContentTypes {
  video = "video",
  article = "article",
  tweet = "tweet",
  thread = "thread",
  post = "post",
  note = "note",
  website = "website",
  tool = "tool",
  other = "other",
}

export interface IVaultItem {
  title: string;
  description: string;
  link?: string;
  type: ContentTypes;
  tags?: Types.ObjectId[];
  userId: Types.ObjectId;
  isPublic: boolean;
}

export interface IVaultItemDocument extends IVaultItem, Document {}

const vaultItemSchema = new Schema<IVaultItemDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
      enum: Object.values(ContentTypes),
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    isPublic: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true },
);

export const VaultItem = model<IVaultItemDocument>(
  "VaultItem",
  vaultItemSchema,
);
