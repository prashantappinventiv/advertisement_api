import express from 'express'
import { UserProduct } from '../controller/product_controller'
import { upload } from '../Middleware/upload_file'
import { uploadController } from '../controller/upload.controller'
import { getCategory } from '../controller/category_controller'
import { filter } from '../controller/category_controller'
import authMiddleware from '../Middleware/authentication'
const product=express.Router()
product.post('/addProduct',authMiddleware,UserProduct.addProduct)
product.get('/category',authMiddleware,getCategory.get)
product.get('/filtercategory',filter.filterCategory)
product.post('/addImage/:pid/:userid',upload.single('photo'), UserProduct.addImage)
export default product;