import { Sequelize } from "sequelize";

const sequelize = new Sequelize('rrhh', 'root', 'klkmanin2000', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;