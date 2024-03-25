import express from 'express';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { connectToDatabase } from './db/connection';
import registrationRouter from './routes/registration.route';
import userAuthenticateRouter from './routes/userAuthenticate.route';
import protectedRouter from './routes/protected.route';
const punycode = require('punycode/');

const app = express();
app.use(express.json());
dotenv.config();
connectToDatabase();

const PORT_STRING = process.env.PORT || '3000';

// Parse PORT as a number
const PORT_NUMBER = parseInt(PORT_STRING, 10);

app.use(registrationRouter);
app.use(userAuthenticateRouter)
app.use(protectedRouter);


app.listen(PORT_NUMBER, () => {
   console.log("Server Listening on PORT:", process.env.PORT || '3000');
});