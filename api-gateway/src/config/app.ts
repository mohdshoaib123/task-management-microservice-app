import express from "express"
import cors from "cors"
import { CLIENT_URL } from "./env.js";


export const app=express()

app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)