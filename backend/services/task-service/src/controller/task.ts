import type { Request, Response,NextFunction} from "express";
import { tryCatch } from "../utils/tryCatch.js";
// import { publishEvent } from "../kafka/producer.js";
import type { AuthenticatedRequest,Task, TaskWithId } from "../shared/types/index.js";
import { AppError, NotFoundError } from "../shared/errors/index.js";
import { prisma } from "../config/db.config.js";
import { getCache, setCache } from "../redis-service/service.js";
import { client } from "../config/redis-config.js";


export const createTask= tryCatch( async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{

  const{title,description,  priority,status, dueDate}=req.body;

const userId=req.user?.id as string;
const task:Task={
  title,
  description,
  userId,
  priority,
  status,
  dueDate:dueDate?new Date(dueDate):null
  
}

// await publishEvent("task.created",task)
await prisma.task.create({
      data: task,
    });

    await client.del("all_tasks")

  

res.status(201).json({
  success:true,
  data:{
    "message": "Task created successfully.",
  "status": "completed"
  }


})
})

export const updateTask=tryCatch(async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  const {id} =req.params as {id:string};
  const {title,description,  priority,status, dueDate}=req.body; 

  if(!id){
   throw new AppError(400,"TASK_ID_REQUIRED","Task id is required");
  } 

const task:any={
   description,
    priority,
    status,
    id,
    title,
    dueDate:dueDate?new Date(dueDate):null
}

    const findTask = await prisma.task.findUnique({
     where: {
       id: id,
    },
   });

  if (!findTask) {
    throw new NotFoundError("Task ");
  }

    await prisma.task.update({
       where: {
        id: id,
   },
    data:task,
  
     });
     await client.del("all_tasks")

await client.del(`task_${id}`)

// })  
  // await publishEvent("task.updated",task)
  res.status(202).json({
  success:true,
  data:{
    "message": "Task updated successfully.",
  "status": "completed"
  }
})
})


export const deleteTask=tryCatch(async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  const {id}=req.params as {id:string};
  if(!id){
    throw new AppError(400,"TASK_ID_REQUIRED","Task id is required");
  }


   const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  
    if (!task) {
      throw new NotFoundError("Task ");
    }
 await prisma.task.delete({
    where:{
      id
    }
  })
  await client.del("all_tasks")
await client.del(`task_${id}`)
res.status(202).json({
  success:true,
  data:{
    "message": "Task deleted successfully.",
    "status": "completed"
  }   
})

})

export const fetchSingleTask=tryCatch(async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  const {id}=req.params as {id:string};

  if(!id){
    throw new AppError(400,"TASK_ID_REQUIRED","Task id is required");
  }
    const key=`task_${id}`
    const cachedTask=await getCache(key)
    if(cachedTask){
      res.status(200).json({
        success:true,
        data:{
          task:cachedTask
        }
      })
      return
    }
  const task:TaskWithId|null=await prisma.task.findUnique({
    where:{
      id
    }
  })
  
  if(!task){
    throw new NotFoundError("Task ");
  }
  await setCache(key,task,3600)
  res.status(200).json({
    success:true,
    data:{
      task
    }
  })
})

export const fetchAllTasks=tryCatch(async (req:AuthenticatedRequest,res:Response,next:NextFunction)=>{
  
const key="all_tasks"
const cachedTasks=await getCache(key)
if(cachedTasks){
  res.status(200).json({
    success:true,
    data:{
      tasks:cachedTasks 
    }})
  return
}

  

  const userId=req.user?.id as string;
  const tasks:TaskWithId[]=await prisma.task.findMany({
    where:{
      userId
    }
  })
  if(!tasks || tasks.length===0){
    throw new NotFoundError("No tasks found for the user.");
  }
  await setCache(key,tasks,3600)
  res.status(200).json({
    success:true,
    data:{
      tasks
    }
  })
})
