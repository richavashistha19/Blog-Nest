import mongoose from "mongoose"
import dotenv from 'dotenv';

dotenv.config();

 const Connection = async () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const URL = `mongodb+srv://${username}:${password}@blog-app.ghevsnh.mongodb.net/?retryWrites=true&w=majority&appName=Blog-App`;
    try {
       await mongoose.connect(URL, { useNewUrlParser: true});
       console.log('Database connected successfully');
    }
    catch (error) {
        console.log('Error while connecting to database', error);

    }
}

export default Connection;