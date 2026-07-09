import { createClient } from "redis"
import { REDIS_URL } from "../config/env.js"
import { logger } from "./logger.js";

export const client = createClient({
  url: REDIS_URL as string,
});


client.on("error", (err) => {
  logger.error("❌ Redis Error:", err);
});

client.on("connect", () => {
  logger.info("✅ Redis connected");
});

client.on("ready", () => {
  logger.info("🚀 Redis ready");
});

client.on("reconnecting", () => {
  logger.info("🔄 Redis reconnecting...");
});

client.on("end", () => {
  logger.info("🔌 Redis connection closed");
});