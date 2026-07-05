import express from "express"
import { taskProxy, userProxy } from "../services/proxy.js"

 const router=express.Router()



 router.use((req, res, next) => {
  console.log("User router:", req.originalUrl);
  next();
});
router.use("/user",userProxy)
router.use("/task",taskProxy)


export default router