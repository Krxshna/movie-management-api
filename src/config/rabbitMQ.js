import amqp from 'amqplib';
let channel = null;

import { LOG_QUEUE } from '../constants.js';

const connectRabbitMQ = async () => {
    try{
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        channel = await connection.createChannel();
        await channel.assertQueue(LOG_QUEUE);
        console.log('Successfully connected to Rabbit MQ');
    }catch(e){
        console.log('Failed to connect to rabbitMQ',e);
    }
};

export {connectRabbitMQ,channel};