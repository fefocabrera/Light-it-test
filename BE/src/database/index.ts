import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv'

dotenv.config({path:__dirname+'/./../../.env'});

const dbName = process.env.DB_NAME || 'light_it_db_dev';
const dbUser = process.env.DB_USER || 'root';
const dbPassword = process.env.DB_PASS || 'root';
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
});

export default sequelize;