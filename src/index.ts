import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { initDatabaseConnection } from './data-access'

export * from './domain'
export * from './data-access'
export * from './libErrorHandler'

export type LibInitOptions = {
  useBuiltInGlobalErrorHandler: boolean
  databaseOptions: DataSourceOptions
}

export function initializeLibrary(options: LibInitOptions) {
  initDatabaseConnection(options.databaseOptions)
}
