import express, { Request } from 'express'
import { signup } from '../controller/signup_controller';
import { Validation } from '../Middleware/joi';

const authRouter=express.Router();
authRouter.post('/signup',Validation.sinupValidate,signup.signin)
export default authRouter;


