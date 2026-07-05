
import type { Request, Response,NextFunction} from "express";
import { UnauthorizedError } from "../shared/errors/index.js";
import { SECRET_TOKEN } from "../config/env.js";
import jwt from "jsonwebtoken"
import type { AuthenticatedRequest } from "../shared/types/index.js";
import { logger } from "../config/logger.js";


export const isAuth=(req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  const token= req.cookies.token;
  

  if(!token){
   throw  new UnauthorizedError("Authentication token is required")
}
const decoded=jwt.verify(token,SECRET_TOKEN as string)

req.user=decoded as Record<string,unknown>

next()


}