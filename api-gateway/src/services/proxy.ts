import { createProxyMiddleware } from "http-proxy-middleware";
import { TASK_SERVICE_URL, USER_SERVICE_URL } from "../config/env.js";

export const userProxy = createProxyMiddleware({
  target: USER_SERVICE_URL,
  changeOrigin: true,
  
});

export const taskProxy = createProxyMiddleware({
  target: TASK_SERVICE_URL,
  changeOrigin: true,
  
  
   
});