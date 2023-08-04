import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_DB_USERNAME, process.env.MYSQL_DB_PASSWORD, {
    host: process.env.MYSQL_DB_HOST,
    dialect: 'mysql'
});