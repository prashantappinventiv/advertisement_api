import express, { Request } from 'express'
import { signup } from '../controller/signup_controller';

const authRouter=express.Router();
authRouter.post('/signup',signup)
export default authRouter;


