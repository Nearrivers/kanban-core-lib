import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

// dotenv.config();

export function initDatabaseConnection(options: DataSourceOptions): DataSource {
  return new DataSource({
    ...options,
    // synchronize: true,
    // logging: process.env.NODE_ENV === Environments.DEVELOPEMENT,
    entities: ["../entities/*ts"],
    migrations: [],
    subscribers: [],
  });
}

export function constructDatabase() {
  // TODO: construct database tables from entities and/or migrations
}