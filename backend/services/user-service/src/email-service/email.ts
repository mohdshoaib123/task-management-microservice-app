import { CLIENT_ID, CLIENT_SECRET, EMAIL_USER, REFRESH_TOKEN } from "../config/env.js";
import { logger } from "../config/logger.js";
import { AppError } from "../shared/errors/index.js";

import nodemailer from 'nodemailer'
import type { SendEmailOptions } from "../shared/types/index.js";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: EMAIL_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

// Verify the connection configuration
export const verifyEmailConnection=async()=>{
  try{
await transporter.verify()
logger.info("Email server is ready")
}
catch(err){
  logger.fatal({err,stack:(err as Error).stack},"Enable to connect Email server.")

  throw new AppError(500, "EMAIL_CONNECTION_ERROR", "Unable to connect to email server.")

}

}
  



const sendEmail = async ({to, subject, text, html}:SendEmailOptions):Promise<void> => {
  try{
    const info = await transporter.sendMail({
      from: `"Task App" <${EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });}
    catch(err){
      logger.error({err,stack:(err as Error).stack},"unhandled error")

      throw new AppError(500,"INTERNAL_ERROR","failed to send email")
      
    }

    
    
  } 
  


export{ sendEmail};