import { channel,connectRabbitMQ } from '../config/rabbitMQ.js';
import { LOG_QUEUE,LOG_DB_NAME } from '../constants.js';
import connect from '../config/db.js';
import { createLog } from '../repositories/logRepository.js';
import dotenv from 'dotenv';
dotenv.config();

export const startLogConsumer = async () => {
    try {
      await connect(LOG_DB_NAME);
      await connectRabbitMQ();
      await channel.assertQueue(LOG_QUEUE);

      channel.consume(LOG_QUEUE, async (msg) => {
        if (msg !== null) {
          try {
            const logData = JSON.parse(msg.content.toString());
            console.log(logData);
            await createLog(logData);
            channel.ack(msg);
          } catch (error) {
            console.error('Error processing message:', error);
            channel.nack(msg, false, false); // Optionally reject the message
          }
        }
      });
    } catch (error) {
      console.error('Failed to start log consumer:', error);
      throw error;
    }
};

startLogConsumer().catch(error => console.error('failed to consume queue',error));