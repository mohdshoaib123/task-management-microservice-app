import dotenv from "dotenv"


dotenv.config()


export const PORT=process.env.PORT
export const CLIENT_URL=process.env.CLIENT_URL
export const  REDIS_URL=process.env.REDIS_URL
export const USER_SERVICE_URL=process.env.USER_SERVICE_URL
export const TASK_SERVICE_URL=process.env.TASK_SERVICE_URL
export const  NODE_ENV=process.env.NODE_ENV