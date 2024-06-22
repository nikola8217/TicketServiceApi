import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

let mongo: any;

declare global {
    var signin: () => string[];
}

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
});

global.signin = () => {
   
    const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: 'test@test.com',
    };
    
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
  
    const session = { jwt: token };
  
    const sessionJSON = JSON.stringify(session);
  
    const base64 = Buffer.from(sessionJSON).toString('base64');
  
    return [`session=${base64}`];
  };