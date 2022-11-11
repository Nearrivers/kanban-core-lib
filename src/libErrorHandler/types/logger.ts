export type Logger = {
  error: (arg: string | Error) => void
  [key: string]: any
}
