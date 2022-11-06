import { Logger } from './types/logger'

class ErrorHandler {
  constructor(private logger: Logger) {}

  public setLogger(logger?: Logger) {
    this.logger = logger
  }

  public handle(error: Error | string): void | Promise<void> {
    this.logger.error(error)
    throw error
  }
}

export const errorHandlerInstance = new ErrorHandler(console)
