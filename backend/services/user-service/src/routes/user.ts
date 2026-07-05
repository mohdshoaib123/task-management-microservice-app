import express from "express";
import { logoutUser, resendOtp, userLogin, userRegister, verifyEmail } from "../controller/user.js";


const router=express.Router()

router.post("/register",userRegister)
router.post("/verify",verifyEmail)
router.post("/resend/otp",resendOtp)
router.post("/login",userLogin)
router.post("/logout",logoutUser)





export default router