import express, { Request, Response } from 'express'
import User from '../model/signup_model'
import bcrypt from 'bcrypt'
import *as dotenv from 'dotenv'
dotenv.config();

export const signup = async (req: Request, res: Response) => {
    const SECRET_KEY = process.env.SECRET_KEY
    try {
        const details = req.body;
        const user = await User.findOne({ where: { email: details.email } });
        console.log(user);
        if (!user) {
            console.log("inside user")
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(details.password, salt)
            const user_details = {
                id: req.body.id,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashpassword,
                mobileno: req.body.mobileno,
                gender: req.body.gender

            };
            console.log(user_details);
            
            const user_onboard = await User.create(user_details)
            res.status(201).json({ message: "user signup sucess" })
            console.log(user_onboard)
        }
        else {
            res.status(404).json({ message: "user already exist" })
        }

    } catch (err) {
        console.log(err, 'something is error')

    }
}