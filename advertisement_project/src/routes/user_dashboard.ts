import express from 'express'
import  {dashboard}  from '../controller/user_dashboard'
import authMiddleware from '../Middleware/authentication'

 const userdash=express.Router();
userdash.post('/updateprofile',dashboard.updateProfile)
userdash.post('/addAddress',dashboard.addAddress)
userdash.post('/updatepassword',dashboard.updatePassword)
userdash.post('/deleteAddress',dashboard.deleteAddress)
userdash.get('/viewProfile',dashboard.viewProfile)
userdash.post('/deleteAccount',dashboard.deleteAccoutn)
export default userdash