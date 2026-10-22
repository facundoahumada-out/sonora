import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const client = new MongoClient(MONGODB_URI, { maxPoolSize: 10 });
export const db = client.db('sonora');

export const connectDB = () => client.connect();
