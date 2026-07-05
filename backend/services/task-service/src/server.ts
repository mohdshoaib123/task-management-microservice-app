import {app} from "./config/app.js"

import {PORT, REDIS_URL} from "./config/env.js"
// import { consumer, producer } from "./config/kafka.js"
import {logger} from "./config/logger.js"
// import { runConsumer } from "./kafka/consumer.js"
// import { initProducer } from "./kafka/producer.js"
import { globalErrorHandler } from "./middleware/errorHandler.js"
import taskRouter from "./routes/task.js"
import { client } from "./config/redis-config.js"
import { NotFoundError } from "./shared/errors/index.js"



await client.connect().then(()=>{
  logger.info("Redis client connected")
}).catch((err)=>{
  logger.error("Error connecting Redis client:", err)
  process.exit(1);
})





app.use("/",taskRouter)



app.use((req, res) => {
  throw new NotFoundError("route")
  
});




// initProducer().then(()=>{
//   logger.info("Kafka producer connected")
// }).catch((err )=>{
//   logger.error("Error connecting Kafka producer:", err)
//    process.exit(1);
  
// })
// runConsumer().then(()=>{
//   logger.info("Kafka consumer connected")
// }).catch((err)=>{
//   logger.error("Error connecting Kafka consumer:", err) 
//  process.exit(1); })

//  process.on("SIGINT", async () => {

//   console.log("Shutting down...");

//   await producer.disconnect();

//   await consumer.disconnect();

//   await prisma.$disconnect();

//   process.exit(0);

// });

  app.use(globalErrorHandler)

app.listen(PORT,()=>{

  logger.info(`server is running on PORT ${PORT}`)
  
})

