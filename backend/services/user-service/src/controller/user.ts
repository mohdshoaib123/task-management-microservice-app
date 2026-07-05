import type { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model.js";
import { AppError, ConflictError, ForbiddenError, NotFoundError, UnauthorizedError, ValidationError } from "../shared/errors/index.js";
import bcrypt from "bcrypt"
import { logger } from "../config/logger.js";
import type { ApiResponse } from "../shared/types/index.js";
import { tryCatch } from "../middleware/tryCatchWrap.js";
import { sendEmail } from "../email-service/email.js";
import { generateOTP, getOtpHtml } from "../utils/utils.js";
import { Otp } from "../models/otp.model.js";
import jwt from "jsonwebtoken"
import { SECRET_TOKEN } from "../config/env.js";
import { zUserSchema } from "../models/user.model.js";
import { zOtpSchema } from "../models/otp.model.js";



export const userRegister= tryCatch(  async (req:Request,res:Response,next:NextFunction)=>{
  const {name,email,password}=req.body;

  const parsedData=zUserSchema.safeParse(req.body)
  if(!parsedData.success){
    
    throw new ValidationError("please inter valid data")
    
  }

  const isExistUser=await User.findOne({
    email
  })
 const hashPassword = await bcrypt.hash(password, 10);

    // ==========================
    // User already exists
    // ==========================
    if (isExistUser) {
      // Already verified
      if (isExistUser.isVerified) {
        logger.warn({email,
          ip:req.ip},"Registration failed: Email already exists")
        throw new ConflictError("Email already exists");
      }

      // User exists but not verified
      isExistUser.name = name;
      isExistUser.password = hashPassword;

      await isExistUser.save();

      // Delete previous OTP
      await Otp.deleteMany({ email });

      // Generate new OTP
      const otp = generateOTP();
      const otpHash = await bcrypt.hash(otp, 10);

      await Otp.create({
        email,
        otpHash,
        user: isExistUser._id,
        expiresAt:new Date(Date.now()+5*60*1000)
      });

      await sendEmail({
        to: email,
        subject: "OTP Verification",
        text: `Your OTP is ${otp}`,
        html: getOtpHtml(otp),
      });

       res.status(200).json({
        success: true,
        message: "Previous account found. New OTP sent successfully.",
        user:{
          name:isExistUser.name,
          email:isExistUser.email,
          isVerified:isExistUser.isVerified

        }
        
      });
      return;
    }

 


    const user=await User.create({
      name,email,password:hashPassword
    })

    const otp=  generateOTP()
    const otpHash=await bcrypt.hash(otp,10)

    await Otp.create({email,otpHash,user:user._id, expiresAt: new Date(Date.now() + 5 * 60 * 1000)})
    const html= getOtpHtml(otp)

    await sendEmail({to:email,subject:"OTP VERIFICATION",text:`your OTP code is ${otp}`,html:html})



    res.status(201).json({
      message:"user create successfully",
      user:{
        name:user.name,
        email:user.email,
        isVerified:user.isVerified
      }
    })



})

export const verifyEmail=tryCatch(async (req:Request,res:Response,next:NextFunction)=>{


  const {email,otp}=req.body;
   const parsedData=zOtpSchema.safeParse(req.body)
  if(!parsedData.success){
    
    throw new ValidationError("please inter valid data")
    
  }

  

  const otpDoc=await Otp.findOne({email})


  if(!otpDoc){
     logger.warn(
    {
      email,
      
      ip: req.ip,
    },
    "Invalid OTP attempt"
  
  )
   throw new UnauthorizedError(
    
    "Invalid OTP. Please try again."
  );
}
const isMatch = await bcrypt.compare(otp, otpDoc.otpHash);

if (!isMatch) {
  logger.warn({email,ip:req.ip},"Invalid OTP")
  throw new UnauthorizedError( "Invalid OTP");
}
const user=await User.findByIdAndUpdate(otpDoc.user,{isVerified:true})

  
  await Otp.deleteMany({email:email})
  const token=jwt.sign({id:user?._id},SECRET_TOKEN as string ,{expiresIn:"7d"})
  res.cookie("token",token)

  res.status(200).json({
    success:true,
     message: "Email verify successfully.",
     token:token,
        user:user
          

  })


}

)

export const resendOtp=tryCatch(async(req:Request,res:Response,next:NextFunction)=>{
  const {email}=req.body
  const user=await User.findOne({email})
  if(!user){
    logger.warn({email,ip:req.ip},"User not found")
    throw new NotFoundError("User not found");

  }
  if(user.isVerified){
    logger.warn({email,ip:req.ip},"user already verified")
     throw new AppError(400,"BAD_REQUEST","User already verified");
  }

  await Otp.deleteMany({email});
  const otp=generateOTP();
  const hashOtp=await bcrypt.hash(otp,10)

 await Otp.create({
  email,
  otpHash:hashOtp,
  expiresAt:new Date(Date.now()+5*60*1000)
 })

 const html=getOtpHtml(otp);

   await sendEmail({to:email,subject:"OTP VERIFICATION",text:`your OTP code is ${otp}`,html:html})


   res.status(200).json({message:"sent OTP successfully"})


})

export const userLogin=tryCatch(async(req:Request,res:Response,next:NextFunction)=>{
  const {email,password}=req.body;
  

 
  const user= await User.findOne({email})
if(!user){
  logger.warn({email,ip:req.ip},"user not found")
  throw new NotFoundError("user")
}
if(!user.isVerified){
   logger.warn({email,ip:req.ip},"Email not verified")
     throw new ForbiddenError("Email not verified");


}
const isMatch=await bcrypt.compare(password,user.password)
if(!isMatch){
    throw new UnauthorizedError(
    "Invalid Email or Password"
  );
}

const token=jwt.sign({id:user._id},SECRET_TOKEN as string,{expiresIn:"7d"})
res.cookie("token",token)

res.status(200).json({success:true,
  message:"Login Successfull",
  token:token
})
})

export const logoutUser=tryCatch(async (req:Request,res:Response)=>{
  res.clearCookie('token')
  res.status(200).json({ success: true, message: 'Logout successful' })
})