import mongoose,{Document,Schema} from "mongoose";
import { z } from "zod";


export interface IUser extends Document{
  name:string,
  email:string,
  password:string,
  isVerified:boolean
}

const userSchema:Schema<IUser>=new Schema({
  name:{
    type:String,
    required:true

  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  isVerified:{
    type:Boolean,
    default:false
  }

})

export const User=mongoose.model("User",userSchema)

export const zUserSchema=z.object({
  name:z.string().trim().min(3,"Name must be at least 3 characters long").max(20,"Name must be at most 20 characters long"),
  email:z.email("Please provide a valid email address").toLowerCase(),
  password:z.string().min(4,"Password must be at least 6 characters long"),
  
})
