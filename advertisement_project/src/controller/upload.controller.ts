import { Request, Response } from "express";

class Upload {
    async fileUpload(req:Request, res:Response) {
        try {
            console.log(req.file);
            return res.status(200).json({message: 'OK'});
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Error"});
        }
    }   
}

export const uploadController = new Upload();