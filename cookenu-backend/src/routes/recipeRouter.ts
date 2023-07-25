import express from "express";
import { RecipesController } from "../controller/RecipesController";


export const recipeRouter = express.Router();

const recipeController = new RecipesController();

recipeRouter.post("/createRecipe", recipeController.createRecipeController);

recipeRouter.get("/:id",(req, res)=> recipeController.getRecipe(req, res));

recipeRouter.get("/allRecipes",recipeController.allRecipes);