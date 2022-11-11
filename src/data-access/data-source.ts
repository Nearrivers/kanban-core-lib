import { DataSource, DataSourceOptions } from 'typeorm'
// import { User } from "./entity/User"
// import dotenv from 'dotenv';

// dotenv.config();

export function initDatabaseConnection(options: DataSourceOptions): DataSource {
  return new DataSource({
    ...options,
    // synchronize: true,
    // logging: process.env.NODE_ENV === Environments.DEVELOPEMENT,
    // TODO: add a glob pattern to read entities
    // entities: [User],
    migrations: [],
    subscribers: [],
  })
}

export function constructDatabase() {
  // TODO: construct database tables from entities and/or migrations
}
