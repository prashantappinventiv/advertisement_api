import {Model,DataTypes} from 'sequelize'
import {sequelize} from '../db_connection/db'
export class Session extends Model{
    public email!:string;
    public isActive!:string;
}
Session.init({
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isActive:{
        type:DataTypes.STRING,
        allowNull:false
    },
},
{
    sequelize,
    modelName:'Session'
})