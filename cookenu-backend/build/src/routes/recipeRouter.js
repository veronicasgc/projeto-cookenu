"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const express_1 = __importDefault(require("express"));
const RecipesController_1 = require("../controller/RecipesController");
exports.recipeRouter = express_1.default.Router();
const recipeController = new RecipesController_1.RecipesController();
exports.recipeRouter.post("/createRecipe", recipeController.createRecipeController);
exports.recipeRouter.get("/:recipeId", recipeController.getRecipe);
exports.recipeRouter.put("/:recipeId", recipeController.editRecipe);
exports.recipeRouter.delete("/:recipeId", recipeController.deleteRecipe);
