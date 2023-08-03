import express from 'express'
import { upload } from '../Middleware/upload_file'
import { uploadController } from '../controller/upload.controller'
import authMiddleware from '../Middleware/authentication'
const uploadImage = express.Router()
uploadImage.post('/image',authMiddleware, upload.single('photo'), uploadController.fileUpload)
export default uploadImage