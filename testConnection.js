import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI; // Replace with your actual environment variable name

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        mongoose.connection.close(); // Close the connection
    })
    .catch(err => {
        console.error('Connection error:', err);
    });