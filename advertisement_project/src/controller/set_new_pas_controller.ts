import {Request,Response} from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../model/signup_model'
import { Session } from '../model/session_model'

export const setNewPaswword =async (req:Request,res:Response)=>{
    const token=req.headers.authorization;
    console.log(token)
    
    if(!token)
    {
        return res.send("access denied")
    }
    try{
        const verif=jwt.verify(token,'SHARMA')as JwtPayload
        console.log("this is verified id",verif)
        const uid=verif.id;
        console.log(uid,"this is uid")
       const {newPassword}=req.body;
       console.log("the password is ",newPassword)

       
       const hashPassword=await bcrypt.hash(newPassword,3)
       const passwordUpdate=await User.update({password:hashPassword,},{where:{id:uid}})
       console.log("password has been change",passwordUpdate)
       return res.status(200).send('password change successfully')

    }catch(err)
    {
        console.log(err);
        res.send("invalid token")
        
    }
}