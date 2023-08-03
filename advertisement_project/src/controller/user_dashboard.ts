import User from "../model/User_model";
import bcrypt from 'bcrypt'
import Address from "../model/address_model";
import { Product } from "../model/product_model";
//import Image from "../model/image_model";
import {createClient} from 'redis';
import { Session } from "../model/session_model";
import {Request,Response}from 'express'
import fs  from "fs";

// const client=createClient();
// client.on("error",(err)=>console.log("client error",(err)))
// client.connect()

class Dashboard{
    async updateProfile(req:Request,res:Response){
        try{
            
            const {user_id,firstName,lastName,email,password,mob_no,gender}=req.body
            await User.update({firstName:firstName,lastName:lastName,email:email,id:user_id,password:password,mob_no:mob_no,gender:gender},{where:{id:user_id}})
            return res.status(200).send('profile updated')
        }
        catch(err)
        {
            return res.status(400).send('please provide proper information')
        }
    }

    async addAddress(req:Request,res:Response){
        try{
            console.log("inside try")
           const{id,area,zipcode,city,state,country,addressid,addresstype,status}=req.body;
           console.log(req.body,'-----------------------------PRANANV---------------------');
           
           const result=await Address.create({id:id,area:area,zipcode:zipcode,city:city,state:state,country:country,status:status,addressid:addressid,addresstype:addresstype})
           console.log('address is added',result)
           return res.status(200).send({message:"address is added succesfull"})

       // let ans = await Address.findAndCountAll()
         //   res.send(ans)
        }
        catch(err)
        {
            console.log(err)
            res.send({err})
        }
    }

    async updatePassword(req:Request,res:Response){
        try{
            console.log("inside try")
            const user_id=req.body.id;
            const password=req.body.password;
            console.log("the value is",user_id,password)
            const hashpwd=await bcrypt.hash(password,3)
            await User.update({password:hashpwd},{where:{id:user_id}})
            return res.status(200).send("password updated successfully")
        }
        catch(err)
        {
            return res.status(400).send()
        }
    }

    async updateAddress(req:Request,res:Response){
        try{
            const user_id=req.body.id;
            const {addressline1,area,zipcode,city,state,country,status,addresstype}=req.body
            await User.update({addressline1:addressline1,area:area,zipcode:zipcode,city:city,state:state,addresstype:addresstype},{where:{id:user_id}})
            return res.status(200).send("address updated successfully")
        }
        catch(err)
        {
            return res.status(400).send(err)
        }
    }

    async deleteAddress(req:Request,res:Response){
        try{
            const address_id=req.body;
            const user_id=req.body.id;
            await Address.destroy({where:{id:address_id,user_id:user_id}})
            return res.status(200).send({message:"address deleted successfully"})
        }
        catch(err)
        {
            return res.status(400).send("internal server eroror")
        }
    }

    async viewProfile(req:Request,res:Response){
        try{
            console.log("inside try")
            const user_id=req.body.id
            console.log(user_id);
            
            const result=await Address.findOne({where:{id:user_id}})
            console.log(result)
            return res.status(200).json(result)
        }
        catch(err)

    {
        console.log(err);
        
        return res.status(400).send("internal server error")
    }
    }

    async deleteAccoutn(req:Request,res:Response){
        try{
            const user_id=req.body.id
            const session_id=req.body.session_id
            await User.destroy({where:{id:user_id}})
            await Session.update({isActive:false,},{where:{id:session_id}})
            try{
                await Address.destroy({where:{id:user_id}})
                await Product.destroy({where:{id:user_id}})
                //await Image.destroy({where:{id:user_id}})
                return res.status(200).json("account is deleted")
            }
            catch(err){}
        }
        
        catch(err){
            return res.status(400).send({message:"account is not deleted"})

        }
    }



}
export const dashboard=new Dashboard()