import express from "express"
import { taskProxy, userProxy } from "../services/proxy.js"

 const router=express.Router()




router.use("/user",userProxy)
router.use("/task",taskProxy)


export default router