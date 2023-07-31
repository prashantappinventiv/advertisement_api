import { Model, DataTypes, IntegerDataType } from 'sequelize';
import { sequelize } from '../db_connection/db';
import { EnumType } from 'typescript';
import User from './signup_model';

export class Address extends Model {
    public addressid!: IntegerDataType;
    
    public area!: string;
    public zipcode!: IntegerDataType;

    public city!: string;
    public state!: string;
    public country!: string;
    public id!: IntegerDataType;
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
      id: {
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
Address.belongsTo(User, { foreignKey: 'user_id' });

export default Address;
