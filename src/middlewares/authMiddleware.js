import jwt from 'jsonwebtoken';
import { getUserById } from '../repositories/userRepository.js';

export const authMiddleware = async (req,res,next) => {
    try{
        const authHeader = req?.headers?.authorization ?? '';
        console.log(authHeader);
        if(!authHeader || authHeader === '' || !authHeader.startsWith('Bearer')){
            return res
              .status(401)
              .json({ message: 'You are not authorized to perform this task' });
        }
        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.JWT_TOKEN);
        console.log(decodedToken);
        console.log(token);
        const userId = decodedToken?.userId ?? '';
        if(!userId){
            return res
              .status(401)
              .json({ message: 'You are not authorized to perform this task' });
        }
        const user = await getUserById(userId);
        req.user = user;
        // console.log(user);
        next();
    }catch(e){
        return res.status(401).json({message:'You are not authorized to perform this task',e});
    }
};