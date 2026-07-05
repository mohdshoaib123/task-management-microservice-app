import { createClient } from "redis"
import { REDIS_URL } from "../config/env.js"
import { logger } from "./logger.js";
import { AppError } from "../shared/errors/index.js";

export const client = createClient({
  url: REDIS_URL as string,
});




client.on("error", function(err: unknown) {
  throw err;

});

client.on("reconnecting", () => {
  logger.info("🔄 Redis reconnecting...");
});
 client.connect().then(()=>{
  logger.info("redis connected successfully")
 })
 .catch((err)=>{
  logger.error(err)
 })