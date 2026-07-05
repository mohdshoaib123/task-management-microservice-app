
import type { Request, Response,NextFunction} from "express";
import type { asyncHandler } from "../shared/types/index.js";

export const tryCatch= (fn:asyncHandler):asyncHandler=>{
    return async (req:Request,res:Response,next:NextFunction)=>{
      try{
      await   fn(req,res,next)}
      catch(err){
        next(err) 
    }
  }}