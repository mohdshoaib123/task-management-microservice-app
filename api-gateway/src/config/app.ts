import express from "express"
import cors from "cors"
import { CLIENT_URL } from "./env.js";



export const app=express()

app.set("trust proxy", 1);

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    service: "api-gateway",
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});