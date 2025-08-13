import { model, Schema, HydratedDocument, Types } from "mongoose";

export interface ILink {
  hash: string;
  contentId: Types.ObjectId;
  userId: Types.ObjectId;
}

export type LinkDocument = HydratedDocument<ILink>;

const linkSchema = new Schema<ILink>(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "Content",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Link = model<ILink>("Link", linkSchema);

export default Link;
