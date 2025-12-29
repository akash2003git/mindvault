import { Schema, model, Document } from "mongoose";
import { genSalt, hash, compare } from "bcryptjs";

export interface IUser {
  username: string;
  email: string;
  password: string;
  vaultPublic: boolean;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
      maxLength: 10,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 20,
    },
    vaultPublic: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// Pre-save hook for password hashing
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidate: string) {
  return compare(candidate, this.password);
};

export const User = model<IUserDocument>("User", userSchema);
