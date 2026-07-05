import mongoose, { Types ,Document,Schema} from "mongoose";
import {z} from "zod";

export interface IOtp extends Document{
  email:string,
  user:Types.ObjectId,
  otpHash:string,
   expiresAt: Date
}

const otpSchema:Schema<IOtp> =new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  },
  otpHash:{
    type:String,
    required:true
  },
   expiresAt: {
  type: Date,
  expires: 0
}
  
},
{ timestamps:true}

)
export const Otp=mongoose.model("Otp",otpSchema)


export const zOtpSchema=z.object({
  email:z.email("Please provide a valid email address").toLowerCase().trim(),
  
  otpHash:z.string().min(6,"OTP must be at least 6 characters long"),
  

})