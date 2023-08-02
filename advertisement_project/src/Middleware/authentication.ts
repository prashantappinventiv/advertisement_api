

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { Session } from '../model/session_model';
import dotenv from 'dotenv';
dotenv.config();


interface jwtPayload{
  id:string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    console.log("inside try")
    const userdata:any = jwt.verify(token, 'PRASHANT')
    console.log((userdata));
    
    const uid=userdata.email
    console.log("the user id is",uid)
    console.log("before session");
    
    const sessionDoc=await Session.findOne({where:{email:uid}});
    console.log(("after session doc"));
    
    if(sessionDoc?.isActive=="true")
    {
        next();
    }
    else{
        res.send({message:"you are not loged in"})
    }
     
  } catch (err) {
    return res.status(401).json({ message: 'Invalid  user' });
  }
};
export default authMiddleware