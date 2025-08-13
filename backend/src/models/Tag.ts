import { model, Schema, HydratedDocument } from "mongoose";

export interface ITag {
  title: string;
}

export type TagDocument = HydratedDocument<ITag>;

const tagSchema = new Schema<ITag>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      minLength: 2,
      maxLength: 30,
    },
  },
  { timestamps: true },
);

const Tag = model<ITag>("Tag", tagSchema);

export default Tag;
