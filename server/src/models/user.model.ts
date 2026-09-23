import mongoose, { Schema, type HydratedDocument, type Model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import type { StringValue } from "ms";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserMethods {
  isPasswordCorrect(password: string): Promise<boolean>;
  generateJwtToken(): string
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (this: HydratedDocument<IUser>) {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};



userSchema.methods.generateJwtToken = function(this : HydratedDocument<IUser>):string{
    return jwt.sign({
        _id: this._id,
        email: this.email
    },
    process.env.JWT_SECRET!,
    {
        expiresIn: process.env.JWT_EXPIRY as StringValue
    }
)
}

export const User = mongoose.model<IUser, UserModel>("User", userSchema);