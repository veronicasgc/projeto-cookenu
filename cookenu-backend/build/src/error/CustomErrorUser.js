"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Unauthorized = exports.UserNotFound = exports.InvalidPassword = exports.InvalidRole = exports.InvalidEmail = exports.InvalidName = void 0;
const CustomError_1 = require("./CustomError");
class InvalidName extends CustomError_1.CustomError {
    constructor() {
        super(400, "Invalid Name!");
    }
}
exports.InvalidName = InvalidName;
class InvalidEmail extends CustomError_1.CustomError {
    constructor() {
        super(400, "Invalid Email!");
    }
}
exports.InvalidEmail = InvalidEmail;
class InvalidRole extends CustomError_1.CustomError {
    constructor() {
        super(400, "Invalid Role!");
    }
}
exports.InvalidRole = InvalidRole;
class InvalidPassword extends CustomError_1.CustomError {
    constructor() {
        super(400, "Invalid password. Enter a password of at least 6 characters!");
    }
}
exports.InvalidPassword = InvalidPassword;
class UserNotFound extends CustomError_1.CustomError {
    constructor() {
        super(404, "User Not Found!");
    }
}
exports.UserNotFound = UserNotFound;
class Unauthorized extends CustomError_1.CustomError {
    constructor() {
        super(401, "Unauthorized User!");
    }
}
exports.Unauthorized = Unauthorized;
