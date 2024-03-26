import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectToDatabase } from './db/connection';
import registrationRouter from './routes/registration.route';
import userAuthenticateRouter from './routes/userAuthenticate.route';
import protectedRouter from './routes/protected.route';

const app = express();
app.use(express.json());
dotenv.config();
connectToDatabase();

const PORT_STRING = process.env.PORT || '3000';
const PORT_NUMBER = parseInt(PORT_STRING, 10);

const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(registrationRouter);
app.use(userAuthenticateRouter);
app.use(protectedRouter);

httpServer.listen(PORT_NUMBER, () => {
   console.log("Server Listening on PORT:", process.env.PORT || '3000');
});

io.on("connection", (socket) => {
   console.log("A user connected");
   // Handle socket events here
 });
