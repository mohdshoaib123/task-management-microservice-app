import { createProxyMiddleware } from "http-proxy-middleware";
import { TASK_SERVICE_URL, USER_SERVICE_URL } from "../config/env.js";

export const userProxy = createProxyMiddleware({
  target: USER_SERVICE_URL,
  changeOrigin:true,
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (req.headers.cookie) {
        proxyReq.setHeader("cookie", req.headers.cookie);
      }
    },

    proxyRes: (proxyRes, req, res) => {
      const cookies = proxyRes.headers["set-cookie"];
      if (cookies) {
        res.setHeader("set-cookie", cookies);
      }
    },
  },
}
// Attach events
);


  



export const taskProxy = createProxyMiddleware({
  target: TASK_SERVICE_URL,
  changeOrigin: true,
  
  
  
  on: {
    proxyReq: (proxyReq, req, res) => {
      if (req.headers.cookie) {
        proxyReq.setHeader("cookie", req.headers.cookie);
      }
    },

    proxyRes: (proxyRes, req, res) => {
      const cookies = proxyRes.headers["set-cookie"];
      if (cookies) {
        res.setHeader("set-cookie", cookies);
      }
    },
  },
   
});
