import { errorHandlerInstance } from './errorHandler'
import { Logger } from './types/logger'

describe('ErrorHandler class test', () => {
  const originalLog = console.error

  const testLogger: Logger = {
    error: jest.fn(),
  }

  beforeAll(() => {
    console.error = jest.fn()
    errorHandlerInstance.setLogger(console)
  })

  afterEach(() => {
    // ;(<jest.Mock>testLogger.error).mockClear()
    // ;(<jest.Mock>console.error).mockClear()
    jest.clearAllMocks()
  })

  test(`GIVEN I want to use the logger
  WHEN an error occured
  THEN the handler should be defined`, () => {
    expect(errorHandlerInstance).toBeDefined()
    expect(errorHandlerInstance).toHaveProperty('handle')
    expect(errorHandlerInstance).toHaveProperty('setLogger')
  })

  test(`GIVEN I want to handle a string type error
  WHEN it occured
  THEN the handler should handle it with default handler (console.error)`, () => {
    const errorString = 'error occured in module'

    expect(() => errorHandlerInstance.handle(errorString)).toThrow(errorString)
    expect(console.error).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(errorString)
  })

  test(`GIVEN I want to handle an Error type error
  WHEN it occured
  THEN the handler should handle it with default handler (console.error)`, () => {
    const errorString = 'error occured in module'
    const error = new Error(errorString)

    expect(() => errorHandlerInstance.handle(error)).toThrow(error)
    expect(console.error).toHaveBeenCalled()
    expect(console.error).toHaveBeenCalledWith(error)
  })

  test(`GIVEN I want to change the default handler
  WHEN I want to change it
  THEN the handler should no longer use the default handler`, () => {
    const errorString = 'error occured in module'

    errorHandlerInstance.setLogger(testLogger)
    expect(() => errorHandlerInstance.handle(errorString)).toThrow(errorString)
    expect(console.error).not.toHaveBeenCalled()
  })

  test(`GIVEN I want to change the default handler
  WHEN I want to change it
  THEN the handler should no longer use the default handler
  AND use the new setted handler`, () => {
    const errorString = 'error occured in module'

    errorHandlerInstance.setLogger(testLogger)
    expect(() => errorHandlerInstance.handle(errorString)).toThrow(errorString)
    expect(console.error).not.toHaveBeenCalled()
    expect(testLogger.error).toHaveBeenCalled()
  })

  test(`GIVEN I want to handle a string type error with my new setted handler
  WHEN it occured
  THEN the handler should handle it with new setted handler`, () => {
    const errorString = 'error occured in module'

    expect(() => errorHandlerInstance.handle(errorString)).toThrow(errorString)
    expect(testLogger.error).toHaveBeenCalled()
    expect(testLogger.error).toHaveBeenCalledWith(errorString)
  })

  test(`GIVEN I want to handle an Error type error with my new setted handler
  WHEN it occured
  THEN the handler should handle it with new setted handler`, () => {
    const errorString = 'error occured in module'
    const error = new Error(errorString)

    expect(() => errorHandlerInstance.handle(error)).toThrow(error)
    expect(testLogger.error).toHaveBeenCalled()
    expect(testLogger.error).toHaveBeenCalledWith(error)
  })

  afterAll(() => {
    console.error = originalLog
  })
})
