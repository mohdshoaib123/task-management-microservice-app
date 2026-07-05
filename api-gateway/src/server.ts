  import{ PORT} from "./config/env.js"
  import {app} from "./config/app.js"
   import { client } from "./config/redis-config.js"
import { logger } from "./config/logger.js"
  import proxyRouter from "./routes/routes.js"
 
import { globalRateLimiter } from "./middleware/ratelimiter.js"
import { globalErrorHandler } from "./middleware/globalErrorHandler.js"
import { NotFoundError } from "./shared/errors/index.js"

  

  
app.use("/hello",(req,res)=>{
  res.send("hello")
})

app.use(globalRateLimiter)

app.use("/api/v1",proxyRouter)


// app.use((req, res) => {
//   throw new NotFoundError("route")
  
// });


app.use(globalErrorHandler)



  app.listen(PORT,()=>{
    logger.info(`server is listen on port ${PORT}`)

  })