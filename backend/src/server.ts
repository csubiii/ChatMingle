import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { connectToDatabase } from './db/connection';

const app = express();
dotenv.config();
connectToDatabase();

const PORT_STRING = process.env.PORT || '3000';

// Parse PORT as a number
const PORT_NUMBER = parseInt(PORT_STRING, 10);

app.listen(PORT_NUMBER, () => {
   console.log("Server Listening on PORT:", process.env.PORT || '3000');
});