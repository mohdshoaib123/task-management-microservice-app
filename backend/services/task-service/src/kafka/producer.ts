// import {producer} from '../config/kafka.js';
// import { logger } from '../config/logger.js';
// import type { Task } from '../shared/types/index.js';

// export const initProducer = async () => {
//   await producer.connect();
  
// };


// export const publishEvent = async (topic:string,task:Task |string) => {
//   try{
//   await producer.send({
//     topic,
//     messages: [
//       {
        
//         value: JSON.stringify(task),
//       },
//     ],
//   });
//   console.log(`Task sent to Kafka topic ${topic}:`, task);
// }
// catch(err){
//   logger.error(err,"Error sending task to Kafka:");
//   throw new Error("Kafka publish failed");
// }
// };