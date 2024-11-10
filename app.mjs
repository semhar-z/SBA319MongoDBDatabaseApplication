import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import connectDB from './db/conn.mjs';
import comment from './routes/comments.mjs';
import dotenv from 'dotenv';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(bodyParser.json());

// Comment Routes
app.use('/api/comments', comment);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
