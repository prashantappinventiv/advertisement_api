import express from 'express'
import { loginuser } from '../controller/login_controller';
const login=express.Router();

login.post('/login',loginuser)
export default login