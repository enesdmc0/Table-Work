import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from "./routes/todos/index.js";
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);
app.use(cors());

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Connected to MongoDb");
    }catch (err){
        console.log(err)
    }
}


mongoose.connection.on("disconnected", () => {
    console.log("mongodb disconnected");
})

app.use(express.json());
app.use("/api/todos", routes)

app.listen("8800", () => {
    connectDB();
    console.log("Backend is running!")
});