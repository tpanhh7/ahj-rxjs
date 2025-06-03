import express from "express";
import { faker } from "@faker-js/faker";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const allowedOrigins = ["https://tpanhh7.github.io", "http://localhost:8080"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API endpoint: http://localhost:${port}/api/messages/unread`);
});

export default app;
