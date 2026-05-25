import { channel } from '../config/rabbitMQ.js';
import { LOG_QUEUE} from '../constants.js';

const publishLog = (logId,LogMessage,logObject,type) => {
    const log = {logId,LogMessage,logObject,type,createdAt: new Date()};
    channel.sendToQueue(LOG_QUEUE,Buffer.from(JSON.stringify(log)));
};


export const logMsg = (logId,LogMessage,logObject) => {
    publishLog(logId,LogMessage,logObject,'log');
};

export const logError = (logId,LogMessage,logObject) => {
    publishLog(logId,LogMessage,logObject,'error');
};