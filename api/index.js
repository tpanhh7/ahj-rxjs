import express from "express";
import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/messages/unread", (req, res) => {
  const count = Math.floor(Math.random() * 3) + 1;
  const messages = Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.words(3),
    body: faker.lorem.paragraph(),
    received: Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 3600),
  }));

  res.json({
    status: "ok",
    timestamp: Math.floor(Date.now() / 1000),
    messages,
  });
});

export default app;
