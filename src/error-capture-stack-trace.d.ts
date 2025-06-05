// https://github.com/microsoft/TypeScript/issues/3926#issuecomment-169096154
interface ErrorConstructor {
  captureStackTrace(thisArg: any, func: any): void;
}
