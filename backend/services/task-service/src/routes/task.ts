import express from 'express';
import  {createTask, deleteTask, fetchAllTasks, fetchSingleTask, updateTask} from "../controller/task.js"
import { isAuth } from '../middleware/isAuth.js';


const router=express.Router();


router.post("/create",isAuth,createTask)
router.put("/update/:id",isAuth,updateTask)
router.delete("/delete/:id",isAuth,deleteTask)
router.get("/fetchsingletask/:id",isAuth,fetchSingleTask)
router.get("/fetchalltasks",isAuth,fetchAllTasks)


  



export default router;