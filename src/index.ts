import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'
import { initDatabaseConnection } from './data-access'
import { ErrorHandler } from './globalErrorHandler/errorHandler'
// import { AppDataSource } from "./data-access/data-source"
// import { User } from "./entity/User"

// AppDataSource.initialize().then(async () => {

//     // console.log("Inserting a new user into the database...")
//     // const user = new User()
//     // user.name = "Timber"
//     // await AppDataSource.manager.save(user)
//     // console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

export * from './domain'
export * from './data-access'
export * from './globalErrorHandler'

export type LibInitOptions = {
  useBuiltInGlobalErrorHandler: boolean
  databaseOptions: DataSourceOptions
}

export function initializeLibrary(options: LibInitOptions) {
  // init with log4js
  // if(!options.useBuiltInGlobalErrorHandler) new ErrorHandler()
  initDatabaseConnection(options.databaseOptions)
}
