import mongoose from "mongoose";
import "dotenv/config";

export const Connection = mongoose.connect(process.env.mongoURL);
