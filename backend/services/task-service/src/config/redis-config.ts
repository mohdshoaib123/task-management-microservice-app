import { createClient } from "redis"
import { REDIS_URL } from "../config/env.js"

export const client = createClient({
  url: REDIS_URL as string,
});

client.on("error", function(err: unknown) {
  throw err;
});

client.on("reconnecting", () => {
  console.log("🔄 Redis reconnecting...");
});