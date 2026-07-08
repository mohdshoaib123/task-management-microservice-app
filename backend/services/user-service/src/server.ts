
import {PORT} from "./config/env.js"
import {app} from "./config/app.js"

import { connectDB } from "./config/db.js"
import {logger} from "./config/logger.js"
import userRoutes from "./routes/user.js"
import { globalErrorHandler } from "./middleware/globalError.Handler.js"

import { NotFoundError } from "./shared/errors/index.js"







app.use("/",userRoutes)








app.use((req, res) => {
  throw new NotFoundError("route")
  
});

app.use(globalErrorHandler)


app.listen(PORT,()=>{
  logger.info(`server is listening on port ${PORT}`)
connectDB().catch((err)=>{
logger.error(err)

})


})
 