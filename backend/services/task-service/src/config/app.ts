import express from "express"
import cookieParser from "cookie-parser"
import { CLIENT_URL } from "./env.js"




export const app=express()



 app.use(express.json())

app.use(express.json())
app.use(cookieParser())