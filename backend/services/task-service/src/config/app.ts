import express from "express"
import cookieParser from "cookie-parser"
import { CLIENT_URL } from "./env.js"
import cors from "cors"



export const app=express()



 app.use(express.json())
 app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json())
app.use(cookieParser())