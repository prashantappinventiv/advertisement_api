import {Model,DataTypes} from 'sequelize'
import { sequelize } from '../db_connection/db'
import { Product } from './product_model';
export class Image extends Model{
    public id!:number;
    public image!:Blob;
    public user_id!:number;
    public product_id!:number;
}

Image.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    image:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    product_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Product,
            key:'id'
        }
    }
},
{
    sequelize,
    modelName:'Image'
}
)
Product.hasMany(Image);
Image.belongsTo(Product,{foreignKey:'product_id'})
export default Image