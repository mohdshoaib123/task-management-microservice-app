import express from 'express'
import cors from 'cors'


import cookieParser from 'cookie-parser'
import { CLIENT_URL } from './env.js'







 const app=express()

 
 app.use(
   cors({
     origin: CLIENT_URL,
     credentials: true,
     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
     allowedHeaders: ["Content-Type", "Authorization"],
   }))


 //it tells the backend that trust in proxy  
app.set("trust proxy", 1);
 app.use(express.json())
 
app.use(cookieParser())

 export {app}