import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

export const sequelize = new Sequelize('Advertisement_database', 'postgres', '    ', {
    host: '192.168.2.191',
    dialect: 'postgres'
})


export const postgres_connect = async () => {
    try {
          sequelize.authenticate().then(() => {
        }).catch((e) => {
            console.error(`we have an error in database authentication ${e}`);
        });
    }
    catch (error) {
        console.log("unable to connect")
    }
}

