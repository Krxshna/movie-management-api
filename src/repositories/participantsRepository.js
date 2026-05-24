import mongoose from 'mongoose';
import Participants from './schema/participantsSchema.js';
import { logMsg } from '../lib/logProducer.js';

export const getAllParticipants = async () => {
    const result = await Participants.find();
    if(!result){
        return [];
    }
    return result;
};

export const getSingleParticipantById = async (participantId) => {
    if(!mongoose.Types.ObjectId.isValid(participantId)){
        console.log('This is not a correct ID, Please provide a correct ID');
        return null;
    }
    const participant = await Participants.findById(participantId);
    if(!participant){
        console.log('This ID not present');
        return null;
    }
    return participant;
};


export const createParticipantByName = async (name,age,role,logId) => {
    logMsg(logId,'Creating a participant in the repository',{name,age,role});
    const newParticipant = new Participants({name,age,role});
    const result = await newParticipant.save();
    logMsg(logId,'Successfully created new participant',result);
    return result;
};

export const updateParticipantById = async (participantId,name,age,role) => {
    if(!mongoose.Types.ObjectId.isValid(participantId)){
        console.log('This is not a correct ID, Please provide a correct ID');
        return null;
    }
    const result = await Participants.findByIdAndUpdate(participantId,{name,age,role},{new:true});
    if(!result){
        console.log('Something went wrong!.. This ID is not present');
        return null;
    }
    return result;
};

export const deleteParticipantById = async (participantId) => {
    if(!mongoose.Types.ObjectId.isValid(participantId)){
        console.log('This is not a correct ID, Please provide a correct ID');
        return false;
    }
    const result = await Participants.findByIdAndDelete(participantId);
    if(!result){
        console.log('Something went wrong!.. This ID is not present');
        return false;
    }
    return true;
};