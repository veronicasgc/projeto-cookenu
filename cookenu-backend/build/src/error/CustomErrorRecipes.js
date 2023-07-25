"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeNotCreated = void 0;
const CustomError_1 = require("./CustomError");
class RecipeNotCreated extends CustomError_1.CustomError {
    constructor() {
        super(404, "Recipe was not created because some data is missing or incorrect. Please enter title and description!");
    }
}
exports.RecipeNotCreated = RecipeNotCreated;
