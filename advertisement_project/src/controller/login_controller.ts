





import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import User from '../model/signup_model';
import { Session } from '../model/session_model';

dotenv.config();

export const loginuser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log("before user");
    const user = await User.findOne({ where: { email: email } });
    console.log(user);
    if (!user) {
      console.log("user not registered please register the user");
      return res.send({ message: "invalid credential" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (passwordCompare) {
      console.log("inside if");
      
      let session = await Session.findOne({ where: { email: user.email } });
      if (!session) {
        
        session = Session.build({
          email: user.email,
          isActive: true,
        });
        await session.save(); 
      }
      const accessToken = jwt.sign({ email: email }, 'PRASHANT', { expiresIn: '10d' });
      console.log(accessToken);
      return res.send({ message: "successfully login" });
    }

    return res.send("invalid password");
  } catch (err) {
    console.log("inside catch");
    console.log(err);
    return res.status(500).send({ message: "Internal server error" });
  }
};
