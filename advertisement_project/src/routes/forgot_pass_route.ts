import express from 'express'
import { forgotPassword } from '../controller/forgot_password_controller'
import authMiddleware from '../Middleware/authentication'
const forgot_pass=express.Router()
forgot_pass.post('/forgot',authMiddleware,forgotPassword)
export default forgot_pass