import express from 'express'
import  {dashboard}  from '../controller/user_dashboard'
import authMiddleware from '../Middleware/authentication'

 const userdash=express.Router();
userdash.post('/updateprofile',authMiddleware,dashboard.updateProfile)
userdash.post('/addAddress',authMiddleware,dashboard.addAddress)
userdash.post('/updatepassword',authMiddleware,dashboard.updatePassword)
userdash.post('/deleteAddress',authMiddleware,dashboard.deleteAddress)
userdash.get('/viewProfile',authMiddleware,dashboard.viewProfile)
userdash.post('/deleteAccount',authMiddleware,dashboard.deleteAccoutn)
export default userdash