import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf } = format;
const loggingFormat = printf(({ level, message, timestamp }) => {
  if (typeof message == "string") message = message.split("\r").join("");
  return `${timestamp} - ${level} : ${message}`;
});

export const logger = createLogger({
  level: "info",
  format: combine(timestamp(), loggingFormat),
  transports: [new transports.Console()],
});
