import {Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/signup_model'
import { Session } from '../model/session_model'
export const forgotPassword=async(req:Request,res:Response)=>{
    try{
        const detail=req.body;
        const check=await User.findOne({where:{email:detail.email}})
        if(!check){
            return res.send(200).json({message:"wrong user"})
        }
        const token=jwt.sign({id:check.id},'SHARMA',{expiresIn:"1d"})
        console.log("the token is",token)
        return res.status(200).send(token)
    }catch(err)
    {
        console.log(err)
    }
}

