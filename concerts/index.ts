import { app } from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT;

const start = async () => {
    const dbConnectionString = process.env.MONGO_URI;

    if (!dbConnectionString) {
        console.log("MONGO_URI is not defined in the environment.");
        return;
    }

    try {
        await connectDB(dbConnectionString);
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        
    }
};

start();