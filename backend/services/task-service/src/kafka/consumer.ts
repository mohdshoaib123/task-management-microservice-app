// import { prisma } from "../config/db.config.js";
// import { consumer } from "../config/kafka.js";
// import { logger } from "../config/logger.js";
// import type { Task } from "../generated/prisma/client.js";
// import { TaskService } from "../services/task.service.js";
// import {AppError} from "../shared/errors/index.js";

// export const runConsumer = async () => {
//   await consumer.connect();
//   await consumer.subscribe({
//     topic: "task.created",
//     fromBeginning: false,
//   });
//   await consumer.subscribe({
//     topic: "task.updated",
//     fromBeginning: false,
//   });


//   await consumer.run({
//     eachMessage: async ({ message,topic }) => {
//       try{
//       const task = JSON.parse(message.value?.toString() || "{}") as Task;
//       console.log(`Received task from Kafka topic ${topic}:`, task);

//    switch (topic) {

//         case "task.created":
//            console.log("Task inswitch");
//           await TaskService.create(task);
         
//           break;

//         case "task.updated":
//           await TaskService.update(task);
//           break;

//         default:
//           logger.warn(`Unknown topic: ${topic}`);
//           break;

//       }

      
//     }
//     catch(err){
//       logger.error(err,"Error processing task from Kafka:");
//       throw new AppError(500, "KAFKA_CONSUMER_FAILED", "Kafka consumer failed");
//     }
//   }

//   });
// };