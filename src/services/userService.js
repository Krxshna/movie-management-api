import {getUserById,createUserById,validateUserPassword,generateAuthToken} from '../repositories/userRepository.js';

export const register = async (req,res)=> {
    const {name,userId,password} = req?.body;
    const checkExistingUser = await getUserById(userId);
    if(checkExistingUser){
        res.status(409).json({message:'The user already exists, please login'});
        return;
    }
    const newUser = await createUserById(name,userId,password);
    if(!newUser){
        res.status(500).json({message:'something went wrong! Could not create user. Please try again'});
        return;
    }
    res.status(201).json(newUser);
};

export const login = async (req,res)=>{
    const {userId,password} = req?.body;
    const checkExistingUser = await getUserById(userId);
    if(!checkExistingUser){
        res.status(404).json({message:'User id or password does not match'});
        return;
    }
    const checkPassword = await validateUserPassword(userId,password);
    if(!checkPassword){
        res.status(404).json({ message: 'User id or password does not match' });
        return;
        //status 403 for unauthorized but for security purpose i am using 404 again
    }
    //jwt auth
    const auth = await generateAuthToken(userId);
    if(!auth){
        res.status(500).json({message:'Could not login user'});
        return;
    }
    res.status(200).json({auth});
};