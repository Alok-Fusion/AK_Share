import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();

const DBConnection = async () => {
    const USERNAME = process.env.DB_USERNAME;
    const PASSWORD = process.env.DB_PASSWORD;

    const MONGO_URI = `mongodb+srv://${USERNAME}:${PASSWORD}@file-sharing.kn1oy.mongodb.net/?retryWrites=true&w=majority&appName=file-sharing`;
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true });
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting with the database ', error.message);
    }
}

export default DBConnection;