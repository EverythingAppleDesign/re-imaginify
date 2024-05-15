import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
    cached = (global as any).mongoose = {
        conn: null, promise: null
    }
}

export const connectToDatabase = async () => {
    // Check whether if we already do have a cached connection, and if do we'll exit out immediately... helps to optimise the app
    if(cached.conn) return cached.conn;

    if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

    // If there is no cached promise of a connection, create new cached promise...
    cached.promise = cached.promise || mongoose.connect(MONGODB_URL, { dbName: 'reimaginify', bufferCommands: false })

    cached.conn = await cached.promise;

    return cached.conn;
}

// Note: Serverless architecture is more scalable...