export const removeHeaders = (req,res,next) => {
    res.removeHeader('x-powered-by');
    next();
};