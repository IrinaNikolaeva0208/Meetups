import "module-alias/register";
import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { envVars } from "@utils/environment";
import { logger } from "@utils/logger";
import { sendErrorInCaseOfWrongRoute, handleErrors } from "@utils/middleware";
import cors from "cors";

const PORT = envVars.GATEWAY_PORT;

const gateway = express();

gateway.use(cors());
gateway.use(
  "/auth",
  createProxyMiddleware({
    target: `http://auth:${envVars.AUTH_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      "^/auth": "",
    },
  })
);
gateway.use(
  "/meetups",
  createProxyMiddleware({
    target: `http://meetups:${envVars.MEETUPS_PORT}`,
    changeOrigin: true,
    pathRewrite: {
      "^/meetups": "",
    },
  })
);
gateway.all("*", sendErrorInCaseOfWrongRoute);
gateway.use(handleErrors);

gateway.listen(PORT, () => logger.info("Gateway started on port " + PORT));
