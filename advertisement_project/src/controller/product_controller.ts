import { Product } from "../model/product_model";
import fs from "fs"
// const fs = require('fs');
import Image from "../model/image_model";
import { upload } from "../Middleware/upload_file";
import { Request, Response } from 'express'
import { where } from "sequelize";
import { getCategory } from "./category_controller";

export class userProduct {
    async addProduct(req: Request, res: Response) {
        try {
            console.log("inside try")
            const user_id = req.body.id;
            console.log(user_id);

            const { id, product_id, product_name, description, baseprice, bidding, category_id, address_id } = req.body;
            const result = await Product.create({ id: id, product_id: product_id, product_name: product_name, description: description, baseprice: baseprice, bidding: bidding, category_id: category_id, address_id: address_id })
            console.log(result);

            return res.status(200).send("product added successfully")
        }
        catch (err) {
            console.log(err)
            return res.send(err)
            return res.status(400).send("improper details")
        }
    }

    async addImage(req: Request, res: Response) {
        try {
            const product_id = req.params.pid
            const user_id= req.params.userid         
            const file:any=req.file;
            console.log('//////////////////////////////',);

            // const imgPath = '/home/user/Desktop/advertisement_project/src/upload/undefined.png'

            const fileData = fs.readFileSync(file.path);
            const bufferData = Buffer.from(fileData)
            console.log(bufferData);
            await Image.create({ image: bufferData, user_id: user_id, product_id: product_id })
            const path1 = '/home/user/Desktop/advertisement_project/src/upload/undefined.png';
            fs.unlink(path1, (data) => {
                console.log("file deleted");

            })
            return res.status(200).send("image has been uploaded")


        }
        catch (err) {
            console.log(err);
            return res.status(200).send("product cant be uploaded")

        }
    }


    
    async viewProduct(req: Request, res: Response) {
        try {
            const id = req.body.id;
            const result = await Product.findOne({ where: { id: id } })
            return res.status(200).send(result)
        }
        catch (err) {
            res.status(400).send("internal server error")
            console.log(err)
        }
    }

    
    async bidd(req: Request, res: Response) {
        try {
            const user_id = req.body.id;
            ///getCategory.get()
            const { product_id, new_bidding_price } = req.body;
            const check1: any = await Product.findOne({ where: { id: product_id } })
            if (check1) {
                const check2 = await Product.findOne({ where: { id: product_id, user_id: user_id } })
                if (check2) {
                    return res.send("you can not bid to your own product")
                }

                else if (check1.bidding_price <= new_bidding_price) {
                    const result = await Product.update({ baseprice: new_bidding_price, bidding_user_id: user_id }, { where: { id: product_id } })
                    return res.status(200).send("bidding successful")
                }
            }
            return res.send("wrong user_id")

        }
        catch (err) {
            console.log(err)
        }

    }

}

export const UserProduct = new userProduct()

