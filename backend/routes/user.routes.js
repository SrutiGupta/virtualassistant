import express from 'express';
import {getCurrentUser,askToAssistant,UpdateAssistant} from "../controller/user.controller.js"
import isAuth from "../middlewares/isAuth.js"
const userRouter = express.Router();
import upload from "../middlewares/multer.js"



userRouter.get('/current',isAuth,getCurrentUser)
userRouter.post('/update',isAuth,upload.single('assistantImage'),UpdateAssistant)
userRouter.post('/asktoassistant',isAuth,askToAssistant)
export default userRouter;
