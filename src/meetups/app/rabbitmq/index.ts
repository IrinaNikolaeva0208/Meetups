import { logger } from "@utils/logger";
import { envVars } from "@utils/environment";
import amqplib from "amqplib";

let channel: amqplib.Channel;

async function connect() {
  try {
    const amqpServer = `amqp://rabbitmq:${envVars.RABBIT_PORT}`;
    const connection = await amqplib.connect(amqpServer);
    channel = await connection.createChannel();

    await channel.assertQueue("check.role");
    await channel.assertQueue("check.token");
    await channel.assertQueue("get.user");
  } catch (error) {
    logger.error(error);
    setTimeout(connect, 2000);
  }
}

connect();

export { channel };
