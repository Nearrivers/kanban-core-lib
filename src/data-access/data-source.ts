import path from 'path';
import 'reflect-metadata'
import { DataSource } from 'typeorm'
// import dotenv from 'dotenv';

// dotenv.config();

const entityPaths = [
  path.join(__dirname, './../entities/*.ts'),
  // pour la prod
  path.join(__dirname, './../entities/*.js')
];

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: entityPaths,
  migrations: [],
  subscribers: [],
})
