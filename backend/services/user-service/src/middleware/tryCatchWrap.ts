import type { asyncHandler } from "../shared/types/index.js";


export const tryCatch=(fn:asyncHandler):asyncHandler=>{
return  async(req,res,next)=>{
try{
 await fn(req,res,next)
}
catch(err){
  next(err)
}

  }
}