import express from "express";
import "./config/instrument.js";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import bodyParser from "body-parser";
import { clerkWebhook } from "./controllers/webhooks.js";

// Initialize express app
const app = express();

// Connect to Database
await connectDB();

// Middleware
app.use(cors());

// 🔥 IMPORTANT: RAW body ONLY for Clerk webhook
app.post(
  "/webhooks",
  bodyParser.raw({ type: "application/json" }),
  clerkWebhook
);

// ✅ JSON middleware for all OTHER routes
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Job Posting API");
});

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Error handler
Sentry.setupExpressErrorHandler(app);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
