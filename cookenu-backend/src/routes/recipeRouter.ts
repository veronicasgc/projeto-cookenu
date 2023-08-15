import express from "express";
import { RecipesController } from "../controller/RecipesController";


export const recipeRouter = express.Router();

const recipeController = new RecipesController();

recipeRouter.post("/createRecipe", recipeController.createRecipeController);

recipeRouter.get("/:recipeId",recipeController.getRecipe);

recipeRouter.put("/:id", recipeController.editRecipe)
