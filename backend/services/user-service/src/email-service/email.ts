import {  EMAIL_USER, } from "../config/env.js";
import { logger } from "../config/logger.js";
import { AppError } from "../shared/errors/index.js";
import type { SendEmailOptions } from "../shared/types/index.js";


import sgMail from '@sendgrid/mail'



//  API key set
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);




//local email implementation
// //  Transporter with proper typing
// const transporter: Transporter = nodemailer.createTransport({
//  host: "smtp.sendgrid.net",
//   port: 587,
//   secure: false, // STARTTLS
//   auth: {
//     user: "apikey", //  fixed string for SendGrid
//     pass: process.env.SENDGRID_API_KEY, //  your SendGrid API key
//   }, family: 4 //  force IPv4
//   } as nodemailer.TransportOptions
//  );

//  
// export const verifyEmailConnection = async () => {
//   try {
//     await transporter.verify();
//     logger.info("Email server is ready");
//   } catch (err) {
//     logger.fatal({ err, stack: (err as Error).stack }, "Unable to connect to email server.");
//     throw new AppError(500, "EMAIL_CONNECTION_ERROR", "Unable to connect to email server.");
//   }
// };

// Send email
// export const sendEmail = async ({ to, subject, text, html }: SendEmailOptions): Promise<void> => {
//   try {
//     const info = await transporter.sendMail({
//       from: `"Task App" <${EMAIL_USER}>`,
//       to,
//       subject,
//       text,
//       html,
//     });
//     logger.info(`Email sent: ${info.messageId}`);
//   } catch (err) {
//     logger.error({ err, stack: (err as Error).stack }, "Failed to send email");
//     throw new AppError(500, "INTERNAL_ERROR", "Failed to send email");
//   }
// };
export const sendEmail = async ({ to, subject, text, html }: SendEmailOptions): Promise<void> => {
  try {
    const msg = {
      to,
      from: EMAIL_USER!, // must be verified sender identity
      subject,
      text:text ||"",
      html:html|| "",
    };
    await sgMail.send(msg);
    logger.info("Email sent via SendGrid REST API ✅");
  } catch (err) {
    logger.error({ err, stack: (err as Error).stack }, "Failed to send email via REST API");
    throw new AppError(500, "INTERNAL_ERROR", "Failed to send email");
  }
};

