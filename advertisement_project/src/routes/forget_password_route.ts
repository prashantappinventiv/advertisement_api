import express from 'express'
import  {forgots_password}  from '../controller/forgot_password_controller'
import authMiddleware from '../Middleware/authentication'

const forgetPassword=express.Router()

forgetPassword.post('/forget',authMiddleware,forgots_password.forgotPassword)
forgetPassword.post('/reset',authMiddleware,forgots_password.reset_password)

export default forgetPassword