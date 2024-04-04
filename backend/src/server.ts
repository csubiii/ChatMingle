import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectToDatabase } from './db/connection';
import registrationRouter from './api/routes/registration.route'
import userAuthenticateRouter from './api/routes/userAuthenticate.route';
import protectedRouter from './api/routes/protected.route';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import sendFriendRequestRouter from './api/routes/sendFriendRequest.route';
import acceptFriendRequestRouter from './api/routes/acceptFriendRequest.route';

dotenv.config();

const PORT_STRING = process.env.PORT || '3000';
const PORT_NUMBER = parseInt(PORT_STRING, 10);

const app = express();
connectToDatabase();

const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: 'http://localhost:5173',
   }
});

app.use(cors())
app.use(cookieParser());
app.use(express.json());

app.use(registrationRouter);
app.use(userAuthenticateRouter);
app.use(protectedRouter);
app.use(sendFriendRequestRouter);
app.use(acceptFriendRequestRouter)

io.on("connection", (socket) => {
   console.log("A user connected");
 
   socket.on("disconnect", () => {
     console.log("User disconnected");
   });
 
   socket.on("chat message", (msg) => {
     console.log("Message received: ", msg);
     io.emit("chat message", msg);
   });
 });


httpServer.listen(PORT_NUMBER, () => {
   console.log("Server Listening on PORT:", process.env.PORT || '3000');
});
