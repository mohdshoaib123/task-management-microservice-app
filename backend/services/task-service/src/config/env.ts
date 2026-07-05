import dotenv from "dotenv"
import e from "express"


dotenv.config()



export  const PORT= process.env.PORT
export const POST_DB_URL= process.env.POST_DB_URL
export const SECRET_TOKEN= process.env.SECRET_TOKEN
export const NODE_ENV= process.env.NODE_ENV
export const CLIENT_URL= process.env.CLIENT_URL
export const REDIS_URL= process.env.REDIS_URL as string