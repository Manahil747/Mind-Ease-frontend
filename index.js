/* eslint-disable no-undef */
const express=require("express");
const dotenv=require('dotenv');
dotenv.config();
const app=express();
app.use(express.json());
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
app.use(helmet()); //for securing headers
// 15 minute mein max 100 requests
const cors = require('cors');
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests'
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(limiter);
app.use(rateLimit());

const PORT= process.env.PORT || 5000;
const connectDB=require('./config/db');
const auth=require('./routes/authRoutes');
const user=require('./routes/userRoutes');
const mood=require('./routes/moodRoutes');
const quiz=require('./routes/quizRoutes');
const appointment=require("./routes/appointmentRoutes");
const therapist=require("./routes/therapistRoutes");
const resource = require("./routes/resourceRoutes");
const chatAI= require("./routes/chatRoutes");
const dashboard= require("./routes/dashboardRoutes");


connectDB();

app.use("/auth", auth);
app.use('/user', user);
app.use('/mood', mood);
app.use('/quiz', quiz);
app.use('/appointment', appointment);
app.use("/therapist", therapist);
app.use('/resource', resource);
app.use("/chatAI", chatAI);
app.use("/dashboard", dashboard);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
