import { Request, Response } from 'express';
import { Session } from '../model/session_model';

export const logoutController = async (req: Request, res: Response) => {
    try {
        const email = req.body.email;
        console.log("email is", email)
        if (!email) {
            console.log("inside if email")
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const user = await Session.findOne({where: {email: email}});
        console.log("user is ", user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (!user.isActive) {
            return res.status(400).json({ message: 'User is already inactive' });
        }
        await Session.update({ isActive: false }, { where: { email: email } })
        console.log("after update")
        await user.save();
        return res.status(200).json({ message: 'Logout successful' });
    } catch (err) {

        console.error('Logout error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

