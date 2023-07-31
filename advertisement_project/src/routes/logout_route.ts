import express from 'express'
import { logoutController } from '../controller/logout_controlller';
const logout=express.Router();

logout.post('/logout',logoutController)
export default logout