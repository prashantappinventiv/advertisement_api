import authMiddleware from '../Middleware/authentication';
import express from 'express'
import { logoutController } from '../controller/logout_controlller';
const logout=express.Router();

logout.post('/logout',authMiddleware,logoutController)
export default logout