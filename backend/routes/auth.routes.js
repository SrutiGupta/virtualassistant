import express from 'express';
import { SignIn, logOut, signUp } from '../controller/auth.controller.js';

const authRouter = express.Router();


authRouter.post('/signup', signUp)

authRouter.post('/Signin', SignIn)

authRouter.get('/logout', logOut)

export default authRouter;