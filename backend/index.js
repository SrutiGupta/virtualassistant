import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { connect } from 'mongoose';
import connecDb from './config/db.js';
import authRouter from './routes/auth.routes.js';
import cookiesParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/user.routes.js';
import geminiResponse from './gemini.js';


const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cookiesParser());
app.use("/api/auth",authRouter )
app.use("/api/user",userRouter )




app.listen(port, () => {
    connecDb();
    console.log(`app listening on port ${port}`);
});