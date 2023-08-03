import {Model,DataTypes} from 'sequelize'
import { sequelize } from '../db_connection/db'
import { Product } from './product_model';
interface ImageAttribute{
    // id:number;
    // user_id:number;
    // image:Blob
    // product_id:number
    fieldname: 'photo',
  originalname: 'Screenshot from 2023-07-30 14-45-49.png',
  encoding: '7bit',
  mimetype: 'image/png',
  destination: '/home/user/Desktop/advertisement_project/src/upload',
  filename: 'undefined.png',
  path: '/home/user/Desktop/advertisement_project/src/upload/undefined.png',
  size: 819176

}
export class Image extends Model{
    public id!:number;
    public image!:Blob;
    public user_id!:number;
    public product_id!:number;
    // public fieldname: 'photo';
    // public originalname: 'Screenshot from 2023-07-30 14-45-49.png';
    // public encoding: '7bit';
    // public mimetype: 'image/png';
    // public destination: '/home/user/Desktop/advertisement_project/src/upload';
    // public filename: 'undefined.png';
    // public path: '/home/user/Desktop/advertisement_project/src/upload/undefined.png';
    // public size: 819176;
}

Image.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    image:{
        type:DataTypes.BLOB,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        
    }
},
{
    sequelize,
    modelName:'Image'
}
)
export default Image