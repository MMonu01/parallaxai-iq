import express from "express";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { UserRefreshClient } from "google-auth-library";
import "dotenv/config";
import generator from "generate-password";

import { userModel } from "../models/user-model.js";
import { AuthMiddleware } from "../middlewares/auth-middleware.js";

export const userRouter = express.Router();

userRouter.post("/userDetails", AuthMiddleware, async (req, res, next) => {
  try {
    if (Object.hasOwn(req, "userId")) {
      const user = await userModel.findOne({ _id: req.userId }, { name: 1, email: 1, profile_image: 1 });

      res.status(200).send({ name: user.name, email: user.email, profile_image: user.profile_image, logged_in_success: true });
    } else {
      res.status(200).send({ logged_in_success: false });
    }
  } catch (err) {
    next(err);
  }
});

userRouter.post("/logout", AuthMiddleware, async (req, res, next) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refresh_token");
    res.end();
  } catch (err) {
    next(err);
  }
});

userRouter.post("/google-login", async (req, res, next) => {
  try {
    const { token: access_token } = req.body;
    const user_client = new UserRefreshClient(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, access_token);
    const { credentials } = await user_client.refreshAccessToken();
    const user_profile = jwtDecode(credentials.id_token);
    const { name, email, picture } = user_profile;
    let user;
    user = await userModel.findOne({ email });

    if (!!user) {
    } else {
      const password = generator.generate({
        length: 10,
        numbers: true,
        symbols: true,
      });
     const  new_user = new userModel({ name, email, password, profile_image: picture });
      await new_user.save();
      user = new_user;
    }
    const token = jwt.sign({ userId: user._id }, process.env.token_secret, { expiresIn: 7 * 24 * 60 * 60, algorithm: process.env.jwt_algorithm });
    const refresh_token = jwt.sign({ userId: user._id }, process.env.refresh_token_secret, { expiresIn: 28 * 24 * 60 * 60, algorithm: process.env.jwt_algorithm });

    res.cookie("token", token, { maxAge: 7 * 24 * 60 * 60 * 1000,  secure: true });
    res.cookie("refresh_token", refresh_token, { maxAge: 28 * 24 * 60 * 60 * 1000, secure: true });
    res.status(200).send({ data: { logged_in_success: true } });
  } catch (err) {
    next(err);
  }
});
