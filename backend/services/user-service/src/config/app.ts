import express from 'express'
import { CLIENT_URL } from './env.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'







 const app=express()


 app.use(express.json())
 app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser())

 export {app}