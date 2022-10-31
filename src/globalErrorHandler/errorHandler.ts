export class ErrorHandler {
  constructor(
    private logger: { error: (arg: string | Error) => void; [key: string]: any }
  ) {
    process.on(
      'unhandledRejection',
      (reason: string, promise: Promise<any>) => {
        throw reason
      }
    )

    process.on('uncaughtException', (error: Error, origin) => {
      this.handle(error)
    })
  }

  public handle(error: Error): void | Promise<void> {
    this.logger.error(error)
    process.exit(1)
  }
}
