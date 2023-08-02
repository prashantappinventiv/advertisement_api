import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/User_model'
import { Session } from '../model/session_model'
import nodemailer from 'nodemailer'
import { Redis } from '../redis/redis'
import { createClient } from 'redis'
import { signup } from './signup_controller'
import * as dotenv from 'dotenv';
dotenv.config()


 export class forgots_password{
    static async forgotPassword(req:any,res:any){
        try{
            const email=req.body.email;
            const user=await User.findOne({where:{email}});
            if(!user){
                return res.status(400).send("email not found")
            }
            let otp=Math.floor(1000+Math.random()*90000);
            Redis.save_otp(email, otp);

            const transporter=nodemailer.createTransport({
                service:'gmail',
                host:'smtp.gmail.com',
                port:465,
                secure:false,
                auth:{
                    user:process.env.EMAIL_ADDRESS,
                    pass:process.env.PASSWORD,
                },

            });
            const mailOptions={
                from:process.env.EMAIL_ADDRESS,
                to:req.body.email,
                subject:'password reset confirmation otp for olx',
                text:`i hope you are doing well you are receiving this email because you has required a password for reset your account.\n\n please click on the link on the following link or paste this into your browser to complete the process ${process.env.CLIENT_URL}/RESET PASSWORD OTP :${otp} `

            }
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error)
                } else{
                    console.log('email seng'+info.response)
                    return res.status(200).json({message:'password reset link set to email'})
                }
            })
            
        }
        catch(error){
            console.log(error)
        }
    }

    static async reset_password(req:any,res:any){
        try{
            const {email,otp,newPassword}=req.body;
            const user=await User.findOne({where:{email:email}})
            if(!user){
              return res.status(200).json({message:'invalid User'})
            }
            const userOtp=await Redis.get_otp(req.body.email);
            console.log(userOtp);
            if(!userOtp||userOtp!==otp){
                return res.status(401).json({error:'invalid otp'})
            }
            console.log(user.password);
            user.password=await newPassword;
            console.log(user.password)
            await user.save()
            return res.status(200).json({message:'password reset successful'})
            
            
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:'server error'})
            
        }
    }
}

