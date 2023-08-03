import { Request, Response } from 'express';
import { Session } from '../model/session_model';
import { RedisSesssion } from '../redis/redis';
import { createClient } from 'redis';

export const logoutController = async (req: Request, res: Response) => {
    
        const redisClient=createClient();
        redisClient.on('error',err=>console.log('Redis client error',err))
        await redisClient.connect()
        try{
        const email = req.body.email;
        
        if (!email) {
            
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user= await Session.findOne({where: {email: email}});
      
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.isActive) {
            return res.status(400).json({ message: 'User is already inactive' });
        }
        if(user)
        {
            await RedisSesssion.update({ isActive: false }, { where: { email: email } })
            await user.save()
            return res.status(200).json({message:"logout successfully"})

        }
        
        
    } catch (err) {

        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

