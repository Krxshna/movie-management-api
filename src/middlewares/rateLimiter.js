import { rateLimit } from 'express-rate-limit';

export const rateLimiter = rateLimit({
    windowMs: 1000 * 60, //1minute
    limit: 5,
    handler : (req,res) => {
        res.status(429).json({message:'too many requests'});
    }
});