import { MongoClient } from "mongodb";

const uri = "mongodb+srv://ramoj745:ramojramoj@cluster0.lnmir.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

async function getDB() {
    return client.db('Cluster0'); // Replace with your database name
}

export { connectDB, getDB };

