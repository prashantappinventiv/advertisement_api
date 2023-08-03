import express from 'express'
import * as dotenv from 'dotenv';
import { postgres_connect } from './src/db_connection/db';
import authRouter from './src/routes/signup_route';
import login from './src/routes/login_route';
import logout from './src/routes/logout_route';

import set_new_pass from './src/routes/set_new_pass_route';
import userdash from './src/routes/user_dashboard';
import product from './src/routes/product_route';
import uploadImage from './src/routes/uploadfle_route';
import forgetPassword from './src/routes/forget_password_route';
 

postgres_connect();
dotenv.config()
console.log("server start")
const port=process.env.PORT;
const app=express()
app.use(express.json());
app.use('/',authRouter)
app.use('/',login)
app.use('/',logout)
app.use('/',forgetPassword)
app.use('/',set_new_pass)
app.use('/',userdash)
app.use('/',product)

app.use('/upload',uploadImage);

app.listen(port,()=>{
    console.log("port is connected",`${port}`)
})


