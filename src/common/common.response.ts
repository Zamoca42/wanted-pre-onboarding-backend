export class CommonResponse<T> {
  success: boolean;
  message: string;
  data: T | T[];

  constructor(success: boolean, message: string, data: T | T[]) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
