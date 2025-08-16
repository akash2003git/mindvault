import { model, Schema, HydratedDocument, Types } from "mongoose";

export interface IContent {
  userId: Types.ObjectId;
  title: string;
  link?: string;
  type: string;
  description?: string;
  tags: Types.ObjectId[];
  publicStatus: boolean;
  metadata?: {
    title?: string;
    description?: string;
    thumbnail?: string;
  };
  embedding?: number[];
}

export type ContentDocument = HydratedDocument<IContent>;

const contentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 200,
    },
    link: {
      type: String,
    },
    type: {
      type: String,
      enum: [
        "youtube",
        "twitter",
        "reddit",
        "instagram",
        "code",
        "notion",
        "article",
        "other",
      ],
      required: true,
    },
    description: {
      type: String,
      minLength: 3,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag", required: true }],
    publicStatus: {
      type: Boolean,
      required: true,
      default: false,
      index: true,
    },
    metadata: {
      title: String,
      description: String,
      thumbnail: String,
    },
    embedding: { type: [Number], default: [] }, // placeholder for AI
  },
  { timestamps: true },
);

const Content = model<IContent>("Content", contentSchema);

export default Content;
