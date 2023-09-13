import { CustomError } from "./CustomError";

  
  export class InvalidName extends CustomError {
    constructor() {
      super(400, "Invalid Name!");
    }
  }
  
  export class InvalidEmail extends CustomError {
    constructor() {
      super(400, "Invalid Email!");
    }
  }
  
  export class InvalidRole extends CustomError {
    constructor() {
      super(400, "Invalid Role!");
    }
  }
  
  export class InvalidPasswordCharacters extends CustomError {
    constructor() {
      super(400, "Invalid password. Enter a password of at least 6 characters!");
    }
  }

  export class InvalidPassword extends CustomError {
    constructor() {
      super(400, "Invalid password!");
    }
  }
  
  export class UserNotFound extends CustomError {
    constructor() {
      super(404, "User Not Found!");
    }
  }
  
  export class Unauthorized extends CustomError {
    constructor() {
      super(401, "Unauthorized User!");
    }
  }