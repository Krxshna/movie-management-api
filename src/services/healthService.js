import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';
import { Redis } from 'ioredis';
import amqp from 'amqplib';

export const checkHealthStatus = async (req,res) => {
    const healthStatus = {
        mongodb:'UNKNOWN',
        redis: 'UNKNOWN',
        rabbitmq: 'UNKNOWN'
    };
    let overallHealthStatus = 200;
    
    try {
        await mongoose.connect(process.env.MONGO_URI.replace('{1}',DB_NAME));
        healthStatus.mongodb = 'OK';
    } catch (error) {
        healthStatus.mongodb = 'DOWN';
        overallHealthStatus = 503;
    }

    try {
        const redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        });
        const pingResult = await redisClient.ping();
        if(pingResult === 'PONG'){
            healthStatus.redis = 'OK';
        }else{
            healthStatus.redis = 'DOWN';
        }
    } catch (error) {
        healthStatus.redis = 'DOWN';
        overallHealthStatus = 503;
    }

    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URI);
        healthStatus.rabbitmq = 'OK';
    } catch (error) {
        healthStatus.rabbitmq = 'DOWN';
        overallHealthStatus = '500';
    }

    res.status(overallHealthStatus).json(healthStatus);
};