import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { connectToDatabase } from './db/connection';
import registrationRouter from './routes/registration.route';
import userAuthenticateRouter from './routes/userAuthenticate.route';
import protectedRouter from './routes/protected.route';
import cors from 'cors';

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
app.use(express.json());

app.use(registrationRouter);
app.use(userAuthenticateRouter);
app.use(protectedRouter);

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
