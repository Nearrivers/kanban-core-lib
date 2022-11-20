import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions';
import { initDatabaseConnection } from './data-access';

export * from './domain';
export * from './data-access';
export * from './libErrorHandler';
export * from './services/list.service';
export * from './services/project.service';
export * from './services/tag.service';
export * from './services/task.service';
export * from './services/user.service';

export type LibInitOptions = {
  useBuiltInGlobalErrorHandler: boolean;
  databaseOptions: DataSourceOptions;
}

export function initializeLibrary(options: LibInitOptions) {
  initDatabaseConnection(options.databaseOptions);
}
