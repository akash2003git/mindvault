import { model, Schema, HydratedDocument } from "mongoose";
import { hash, compare } from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  password?: string;
  authProvider: "local" | "google";
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    unique: true,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    minLength: 8,
    maxLength: 20,
    select: false,
    required: function () {
      return this.authProvider === "local";
    },
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
});

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (
    this.authProvider === "local" &&
    this.isModified("password") &&
    this.password
  ) {
    this.password = await hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  if (!this.password) return false;
  return await compare(candidatePassword, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
