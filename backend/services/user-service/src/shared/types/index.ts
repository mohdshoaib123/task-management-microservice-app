import type { NextFunction, Request, Response } from "express"

export interface ApiResponse<T=unknown>{
  success:boolean,
  data?:T,
  err?:{
    code:string,
    message:string,
    details?:Record<string,unknown>
  }
}

export interface SendEmailOptions { to: string; subject: string; text?: string; html?: string; }

export type asyncHandler=(req:Request,res:Response,next:NextFunction)=>Promise<void>