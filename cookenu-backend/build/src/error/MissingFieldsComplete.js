"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingFieldsToComplete = void 0;
const CustomError_1 = require("./CustomError");
class MissingFieldsToComplete extends CustomError_1.CustomError {
    constructor() {
        super(401, "Missing fields to complete");
    }
}
exports.MissingFieldsToComplete = MissingFieldsToComplete;
