"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidToken = void 0;
const CustomError_1 = require("./CustomError");
class InvalidToken extends CustomError_1.CustomError {
    constructor() {
        super(400, "Invalid Token!");
    }
}
exports.InvalidToken = InvalidToken;
