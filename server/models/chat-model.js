import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  preview: { type: String, required: true },
});

const messageSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ["text", "image"], required: true },
  answer: { type: String, required: true },
  question: { type: String, required: true },
});

export const chatModel = mongoose.model("chat", chatSchema);

export const messageModel = new mongoose.model("message", messageSchema);
