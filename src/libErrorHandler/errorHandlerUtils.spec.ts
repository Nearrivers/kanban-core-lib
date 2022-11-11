import { errorHandlerInstance } from './errorHandler'
import {
  errorPromiseWrapper,
  getErrorHandler,
  setErrorLogger,
} from './errorHandlerUtils'
import { Logger } from './types/logger'

describe('ErrorHandler class test', () => {
  const testLogger: Logger = {
    error: jest.fn(),
  }

  test(`GIVEN I want to use the logger
  THEN I sould be able to retrieve the logger`, () => {
    expect(getErrorHandler()).toBeDefined()
    expect(getErrorHandler()).toEqual(errorHandlerInstance)
  })

  test(`GIVEN I want to change the logger use by the handler
  THEN the logger should have been changed`, () => {
    const handler = getErrorHandler() as any
    expect(handler.logger).toEqual(console)
    setErrorLogger(testLogger)
    expect(handler.logger).toEqual(testLogger)
  })

  test(`GIVEN I want to handle an error on a promise call
  THEN wrapper should be able to use the error handler to log the error and rethrow it`, async () => {
    jest.clearAllMocks()
    setErrorLogger(testLogger)
    const error = 'error'
    await errorPromiseWrapper(Promise.reject(error)).catch((promiseError) => {
      expect(promiseError).toEqual(error)
    })
    expect(testLogger.error).toHaveBeenCalled()
    expect(testLogger.error).toHaveBeenCalledWith(error)
    jest.clearAllMocks()
  })
})
