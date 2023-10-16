import amqplib from "amqplib";
import { logger } from "@utils/logger";
import { envVars } from "@utils/environment";
import {
  checkIfTokenIsValid,
  checkRole,
  getUserByJwt,
} from "../middleware/helpers";

async function connect() {
  try {
    const amqpServer = `amqp://rabbitmq:${envVars.RABBIT_PORT}`;
    const connection = await amqplib.connect(amqpServer);
    const channel = await connection.createChannel();

    await channel.assertQueue("result.role");
    await channel.assertQueue("result.token");
    await channel.assertQueue("result.user");

    await channel.consume("check.role", (data) => {
      channel.ack(data);
      const recieved = JSON.parse(data.content.toString());
      channel.sendToQueue(
        "result.role",
        Buffer.from(checkRole(recieved.authHeader, recieved.role).toString())
      );
    });

    await channel.consume("get.user", (data) => {
      channel.ack(data);
      const recieved = data.content.toString();
      channel.sendToQueue(
        "result.user",
        Buffer.from(getUserByJwt(recieved).toString())
      );
    });

    await channel.consume("check.token", async (data) => {
      channel.ack(data);
      const recieved = data.content.toString();
      channel.sendToQueue(
        "result.token",
        Buffer.from(await checkIfTokenIsValid(recieved))
      );
    });
  } catch (error) {
    logger.error(error);
    setTimeout(connect, 2000);
  }
}

connect();
