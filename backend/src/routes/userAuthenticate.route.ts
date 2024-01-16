import express from 'express';
import { userAuthenticate }  from '../controllers/userAuthenticate.controller';
const userAuthenticateRouter = express.Router();

userAuthenticateRouter.post("/api/v1/userAuthenticate", userAuthenticate)

export default userAuthenticateRouter;