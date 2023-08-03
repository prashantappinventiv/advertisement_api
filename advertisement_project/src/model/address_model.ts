import { Model, DataTypes, IntegerDataType } from 'sequelize';
import { sequelize } from '../db_connection/db';
import { EnumType } from 'typescript';
import User from './User_model';

export class Address extends Model {
    public addressid!: number;

    public area!: string;
    public zipcode!: number;

    public city!: string;
    public state!: string;
    public country!: string;
    public id!: number;
}

Address.init({

    area: {
        type: DataTypes.STRING
    },
    city: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.STRING
    },
    zipcode: {
        type: DataTypes.INTEGER
    },
    country: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    },
    addressid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
         references: {
             model: User,
             key: 'id'
         }
    }
}, {
    sequelize,
    modelName: 'Address'
});

User.hasMany(Address);
Address.belongsTo(User, { foreignKey: 'id' });
Address.sync()

export default Address;
