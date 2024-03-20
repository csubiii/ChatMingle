import express from 'express';
import { registration } from '../controllers/registration.controller';
const registrationRouter = express.Router();

registrationRouter.post("/api/v1/registration", registration)

export default registrationRouter;