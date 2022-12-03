import 'reflect-metadata';
import { DataSource, DataSourceOptions, EntityManager } from 'typeorm';

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

export async function constructDatabase(libDataSource: DataSource): Promise<EntityManager> {
  return await libDataSource.initialize().then(() => {
    return libDataSource.manager;
  })
}