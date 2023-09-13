"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnableToEditRecipe = exports.UnableToDeleteRecipe = exports.RecipeNotFound = exports.RecipeNotCreated = void 0;
const CustomError_1 = require("./CustomError");
class RecipeNotCreated extends CustomError_1.CustomError {
    constructor() {
        super(404, "Recipe was not created because some data is missing or incorrect. Please enter title and description!");
    }
}
exports.RecipeNotCreated = RecipeNotCreated;
class RecipeNotFound extends CustomError_1.CustomError {
    constructor() {
        super(404, "Recipe not found!");
    }
}
exports.RecipeNotFound = RecipeNotFound;
class UnableToDeleteRecipe extends CustomError_1.CustomError {
    constructor() {
        super(404, "You do not have permission to delete this recipe.");
    }
}
exports.UnableToDeleteRecipe = UnableToDeleteRecipe;
class UnableToEditRecipe extends CustomError_1.CustomError {
    constructor() {
        super(404, "You do not have permission to edit this recipe.");
    }
}
exports.UnableToEditRecipe = UnableToEditRecipe;
