import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile_image: { type: String, required: true },
});

export const userModel = mongoose.model("user", userSchema);
