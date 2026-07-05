import dotenv from 'dotenv'

dotenv.config()

export const PORT= process.env.PORT || 4000
export const DB_URL=process.env.DB_URL
export const CLIENT_ID=process.env.CLIENT_ID
export const CLIENT_SECRET=process.env.CLIENT_SECRET
export const REFRESH_TOKEN=process.env.REFRESH_TOKEN
export const EMAIL_USER=process.env.EMAIL_USER
export const NODE_ENV=process.env.NODE_ENV
export const SECRET_TOKEN=process.env.SECRET_TOKEN
export const CLIENT_URL=process.env.CLIENT_URL