import { CustomError } from "./CustomError";

export class InvalidToken extends CustomError {
    constructor() {
      super(400, "Invalid Token!");
    }
  }