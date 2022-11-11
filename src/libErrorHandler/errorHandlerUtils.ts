import { errorHandlerInstance } from './errorHandler'
import { Logger } from './types/logger'

export function getErrorHandler() {
  return errorHandlerInstance
}

export async function errorPromiseWrapper(promise: Promise<any>) {
  return promise.catch(
    await errorHandlerInstance.handle.bind(errorHandlerInstance)
  )
}

export function setErrorLogger(logger: Logger) {
  errorHandlerInstance.setLogger(logger)
}
