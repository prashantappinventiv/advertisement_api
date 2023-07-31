import {Model,DataTypes} from 'sequelize'
import { sequelize } from '../db_connection/db'
import User from './signup_model'
import Category from './category_model';
import { Address } from './address_model';


export class Product extends Model{
    product_id!:number;
    public product_name!:string;
    public description!:string;
    public image!:string;
    public bidding!:number;
    public baseprice!:number;
    public userid!:string;
    public categoryid!:string;
    public address_id!:string;
}

Product.init({
    product_id:{
        type:DataTypes.STRING,
        primaryKey:true

    },
    product_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING
        
    },
    baseprice:{
        type:DataTypes.STRING
    },
    bidding_price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    bidding_user_id:{
        type:DataTypes.INTEGER,
        allowNull:true,
        references:{
            model:User,
            key:'id'
        }
    },
    category_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Category,
            key:'id'
        }
    },
    address_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:Address,
            key:'id'
        }
    }
},
{
    sequelize,
    modelName:'Product'

    
})
User.hasMany(Product)
Product.belongsTo(User, {
    foreignKey: 'bidding_user_id', 
  });
  Category.hasMany(Product)
  Product.belongsTo(Category,{foreignKey:'category_id'})
  User.hasMany
