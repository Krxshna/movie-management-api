import cron from 'node-cron';
import { deleteLogs } from '../repositories/logRepository.js';

export const deleteCronJob = async () => {
    cron.schedule('30 15 21 3 *',async () => {
        try{
            await deleteLogs();
            console.log('Succesfully deleted the jobs');
        }catch(error){
            console.log('Error in deleting the logs ',error);
        }
    }); //every march 21st at 3 30pm run this cron job
};