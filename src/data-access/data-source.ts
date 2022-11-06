import 'reflect-metadata'
import { DataSource } from 'typeorm'
// import dotenv from 'dotenv';

// dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ["../entities/*ts"],
  migrations: [],
  subscribers: [],
})
