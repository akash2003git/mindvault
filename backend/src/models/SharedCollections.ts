import { model, Schema, HydratedDocument, Types } from "mongoose";

export interface ISharedCollection {
  hash: string;
  userId: Types.ObjectId;
  title: string;
  tags?: Types.ObjectId[];
  public: boolean;
}

export type ISharedCollectionDocument = HydratedDocument<ISharedCollection>;

const sharedCollectionSchema = new Schema(
  {
    hash: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    public: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const SharedCollection = model<ISharedCollection>(
  "SharedCollection",
  sharedCollectionSchema,
);

export default SharedCollection;
