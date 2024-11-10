import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const dbURI = process.env.ATLAS_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export  default connectToDb;
