import * as dotenv from 'dotenv';
dotenv.config();

export const mysqlConfigOptions = {
  host: process.env.MYSQL_HOST,
  port: +(process.env.MYSQL_PORT ?? '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};
