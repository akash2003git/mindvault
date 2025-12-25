import { Schema, model, Document, Types } from "mongoose";

export interface ITag {
  title: string;
  userId: Types.ObjectId;
}

export interface ITagDocument extends ITag, Document {}

const tagSchema = new Schema<ITagDocument>(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export const Tag = model<ITagDocument>("Tag", tagSchema);
