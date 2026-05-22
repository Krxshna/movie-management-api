import mongoose from 'mongoose';

const connect = async (dbName) => {
    try {
        let connectString = process.env.MONGO_URI || '';
        if(connectString === ''){
            throw new error('No connection string found');
        }
        connectString = connectString.replace('{1}',dbName);
        await mongoose.connect(connectString);
        console.log('Successfully connected to the DB');
    } catch (error) {
        console.log('Could not connect to db', error?.message);
        process.exit();  //if db not present then no point of running the service
    }
};

export default connect;