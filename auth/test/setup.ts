import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import dotenv from 'dotenv';
dotenv.config();

let mongo: any;

beforeAll(async () => {
    process.env.JWT_SECRET = 'zzzzzz';
    console.log(process.env.JWT_SECRET, process.env.PORT);
    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    
    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})