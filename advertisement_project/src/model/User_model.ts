import { Model, DataTypes, TinyIntegerDataType, IntegerDataType } from 'sequelize'
import { sequelize } from '../db_connection/db'

 class User extends Model {
    public id!: BigInt;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public status!: string;
    public mob_no!: BigInt;
    public gender!: string;
  
}



User.init({
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    gender: {
        type: DataTypes.STRING
    },
    
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    mob_no:{
        type:DataTypes.BIGINT
    }
}, {
    sequelize: sequelize, 
    modelName: 'User'
   
});
export default User;

