import { validationResult } from 'express-validator';
import { logMsg } from '../lib/logProducer.js';

export const handleValidationErrors = (req,res,next) => {
    const logId = req?.logId;
    logMsg(logId,'Inside validation failed block',{});
    const errors = validationResult(req);
    const errorArray = errors.array().map((err) => err.msg);
    console.log(errors.array().map(err => err.msg));
    if(errorArray.length > 0){
        res.status(400).json(errorArray);
        return;
    }
    next();
};