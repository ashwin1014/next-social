import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URI) {
        console.log('MONGODB_URI is not defined');
        return Promise.reject();
    }

    if (isConnected) {
        console.log('=> using existing database connection');
        return Promise.resolve();
    }

    try {
        console.log('=> using new database connection');
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
    } catch (error) {
       if (error instanceof Error) {
         console.log('=> error while connecting with database:', error?.message);
       }
    }

};