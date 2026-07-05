import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/index.js";
import { logger } from "../config/logger.js";
import type { ApiResponse } from "../shared/types/index.js";
import { NODE_ENV } from "../config/env.js";


  export const globalErrorHandler:ErrorRequestHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
  if(err instanceof AppError){
    logger.warn({code:err.code,statusCode:err.statusCode,details:err.details},err.message)

    const body:ApiResponse={
      success:false,
      err:{
        code:err.code,
        message:err.message,
        ...(err.details && {details:err.details})

      }
    }
    res.status(err.statusCode).json(body)
    return;
}


// unexpected error occur
logger.error({err,stack:err.stack},"unhandled error")

const body:ApiResponse={
  success:false,
  err:{
    code:"INTERNAL_ERROR",
    message:NODE_ENV==="development"? err.message : "unexceepted error occured. please try again later"
  }
}
res.status(500).json(body)
}