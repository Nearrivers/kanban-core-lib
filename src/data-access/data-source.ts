import 'reflect-metadata'
import { DataSource } from 'typeorm'
// import { User } from "./entity/User"
// import dotenv from 'dotenv';

// dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  // TODO: add a glob pattern to read entities
  // entities: [User],
  migrations: [],
  subscribers: [],
})
