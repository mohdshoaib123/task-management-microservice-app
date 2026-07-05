import mongoose from "mongoose";
import { DB_URL } from "./env.js";



const connectDB=async ()=> {

  await mongoose.connect(DB_URL as string);
  console.info("Database connected successfully")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
 export {connectDB}