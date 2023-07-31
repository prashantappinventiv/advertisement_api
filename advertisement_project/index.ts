import express from 'express'
import * as dotenv from 'dotenv';
import { postgres_connect } from './src/db_connection/db';
import authRouter from './src/routes/signup_route';
import login from './src/routes/login_route';
import logout from './src/routes/logout_route';
import forgot_pass from './src/routes/forgot_pass_route';
import set_new_pass from './src/routes/set_new_pass_route';
import userdash from './src/routes/user_dashboard';

postgres_connect();
dotenv.config()
console.log("server start")
const port=process.env.PORT;
const app=express()
app.use(express.json())
app.use('/',authRouter)
app.use('/',login)
app.use('/',logout)
app.use('/',forgot_pass)
app.use('/',set_new_pass)
app.use('/',userdash)

app.listen(port,()=>{
    console.log("port is connected",`${port}`)
   
})


