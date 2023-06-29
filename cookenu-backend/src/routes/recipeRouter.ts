import express from "express";
import { RecipeBusiness } from "../business/RecipesBusiness"
import { RecipeDatabase } from "../data/RecipesDatabase";
import { RecipesController } from "../controller/RecipesController";


export const recipeRouter = express.Router();

const recipeBusiness = new RecipeBusiness();

const recipeController = new RecipesController(recipeBusiness);

recipeRouter.post("/createRecipe", recipeController.createRecipeController);
