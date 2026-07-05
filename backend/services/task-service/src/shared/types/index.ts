import type { Request, Response,NextFunction} from "express";

    export type asyncHandler=(req:Request,res:Response,next:NextFunction)=>Promise<void>

    export interface ApiResponse<T=unknown>{
  success:boolean,
  data?:T,
  err?:{
    code:string,
    message:string,
    details?:Record<string,unknown>
  }
}


export interface AuthenticatedRequest extends Request {
  user?: Record<string, unknown>;
}

export interface Task {
  
  title: string;
  description: string | null;
  userId : string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH'; 
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  dueDate?: Date | null;
  
}
export interface TaskWithId extends Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}