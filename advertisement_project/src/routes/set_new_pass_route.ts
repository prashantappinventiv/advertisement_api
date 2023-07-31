import express from 'express'
import { setNewPaswword } from '../controller/set_new_pas_controller'
import authMiddleware from '../Middleware/authentication'
const set_new_pass=express.Router()
set_new_pass.post('/set_pass',setNewPaswword)
export default set_new_pass