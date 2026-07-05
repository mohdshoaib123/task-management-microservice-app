import { logger } from "../config/logger.js";
import { client } from "../config/redis-config.js";


export const setCache = async (key: string, value: unknown, ttl = 3600) => {
  try {
    await client.setEx(
      key,
      ttl,
      JSON.stringify(value)
    );

    return true;
  } catch (error : any) {
    logger.error(error,"Redis SET Error:");
    return false;
  }
};

export const getCache = async (key: string) => {
  try {
    const data = await client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  } catch (error : any) {
  logger.error(error,"Redis GET Error:",);
    return null;
  }
};