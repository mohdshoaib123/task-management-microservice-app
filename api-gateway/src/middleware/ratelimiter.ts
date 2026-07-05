import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { client} from "../config/redis-config.js";

import { RateLimitError } from "../shared/errors/index.js";

export const globalRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  limit: 300,

  standardHeaders: true,

  legacyHeaders: false,

  store: new RedisStore({
    sendCommand: (...args: string[]) => client.sendCommand(args),
  }),

  handler: (req, res, next) => {
    next(
      new RateLimitError (
        
      )
    );
  },

  skipSuccessfulRequests: false,

  skipFailedRequests: false,
});