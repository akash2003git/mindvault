import { model, Schema, HydratedDocument } from "mongoose";
import { hash, compare } from "bcrypt";

export interface IUser {
  username: string;
  email: string;
  password: string;
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
    required: true,
    minLength: 8,
    maxLength: 20,
    select: false,
  },
});

// Pre-save hook for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return await compare(candidatePassword, this.password);
};

const User = model<IUser>("User", userSchema);

export default User;
