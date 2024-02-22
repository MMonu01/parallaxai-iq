import fs from "node:fs/promises";
import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser"

// import cors from "cors";

import { Connection } from "./config/db.js";

import { AuthMiddleware } from "./middlewares/auth-middleware.js";

import { userRouter } from "./routes/user-route.js";
import { chatRouter } from "./routes/chat-route.js";

const isProduction = process.env.NODE_ENV === "production";

const app = express();

// app.use(cors({ credentials: true, origin: process.env.project_url }));

app.use(express.json());
app.use(cookieParser(process.env.cookie_parser_key));

let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static("./dist/client"));
}

app.get("*", async (req, res) => {
  try {
    const url = req.originalUrl;

    let template_html;
    if (!isProduction) {
      template_html = await fs.readFile("./index.html", "utf-8");
      template_html = await vite.transformIndexHtml(url, template_html);
    } else {
      template_html = await fs.readFile("./dist/client/index.html", "utf-8");
    }
    res.status(200).send(template_html);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.use("/user", userRouter);

app.use(AuthMiddleware);
app.use((req, res, next) => {
  if (!Object.hasOwn(req, "userId") && req.path !== "/chat/chat-response") {
    next("Session time out please login again");
  } else {
    next();
  }
});

app.use("/chat", chatRouter);

app.listen(process.env.port, async () => {
  try {
    await Connection;

    console.log("Successfully connected to db");
  } catch (err) {
    console.log("Failed to connect to db");
  }
  console.log(`server is running at port ${process.env.port}`);
});
