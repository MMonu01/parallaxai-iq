import express from "express";
import markdownit from "markdown-it";

import { chatModel, messageModel } from "../models/chat-model.js";
import { GeminiAi } from "../utils/gemini-ai.js";

export const chatRouter = express.Router();

chatRouter.post("/get-chats", async (req, res, next) => {
  const userId = req.userId;
  const { text: preview } = req.body;
  let chats;

  try {
    if (!!userId) {
      if (preview) {
        chats = await chatModel.find({ userId, preview: { $regex: preview } });
      } else {
        chats = await chatModel.find({ userId }, { userId: 0 });
      }
      res.status(200).send(chats);
    } else {
      next("invalid user id");
    }
  } catch (err) {
    next(err);
  }
});

chatRouter.post("/get-message-list", async (req, res, next) => {
  const { chatId } = req.body;

  try {
    const message_list = await messageModel.find({ chatId }, { _id: 1, answer: 1, question: 1 });
    res.status(200).send(message_list);
  } catch (err) {
    next(err);
  }
});

chatRouter.post("/chat-response", (req, res, next) => {
  const { chatId, question } = req.body;
  const userId = req.userId;
  let current_chat_id = chatId;
  let is_valid_chat_id = false;

  try {
    GeminiAi(question).then(async (result) => {
      const md = markdownit();
      const response = md.render(result.response.text());

      if (!req.userId) {
        res.status(200).send({ chatId: null, message: { _id: null, question: question, answer: response } });
      } else {
        if (chatId) {
          const chat = await chatModel.findOne({ _id: chatId });
          if (chat) {
            is_valid_chat_id = true;
            current_chat_id = chat._id;
          }
        }

        if (is_valid_chat_id) {
          const chat = await chatModel.updateOne({ _id: current_chat_id }, { preview: question });
        } else {
          const new_chat = new chatModel({ userId, preview: question, date: new Date() });
          await new_chat.save();
          current_chat_id = new_chat._id;
        }

        const new_message_obj = { chatId: current_chat_id, userId, date: new Date(), type: "text", question, answer: response };

        const new_message = new messageModel(new_message_obj);
        await new_message.save();

        res.status(200).send({ chatId: current_chat_id, message: { _id: new_message._id, question: new_message.question, answer: new_message.answer } });
      }
    });
  } catch (err) {
    next(err);
  }
});
