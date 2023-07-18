import express from "express";
import { RecipeBusiness } from "../business/RecipesBusiness";
import { RecipeDatabase } from "../data/RecipesDatabase";
import { RecipesController } from "../controller/RecipesController";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const recipeRouter = express.Router();
const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();
const recipeDatabase = new RecipeDatabase();
const recipeBusiness = new RecipeBusiness(recipeDatabase, idGenerator, tokenGenerator); 
const recipeController = new RecipesController(recipeBusiness, idGenerator);

recipeRouter.post("/createRecipe", recipeController.createRecipeController);


recipeRouter.get("/:title", recipeController.getRecipeById);