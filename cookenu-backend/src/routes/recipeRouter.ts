import express from "express";
import { CreateRecipeDatabase } from "../endpoints/createRecipe/CreateRecipeDatabase";
import { CreateRecipeBusiness } from "../endpoints/createRecipe/CreateRecipeBusiness";
import { CreateRecipeController } from "../endpoints/createRecipe/CreateRecipeController";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { GetRecipeController } from "../endpoints/getRecipe/GetRecipeController";
import { GetRecipeBusiness } from "../endpoints/getRecipe/GetRecipeBusiness";
import { GetRecipeDatabase } from "../endpoints/getRecipe/GetRecipeDatabase";
import { EditRecipeDatabase } from "../endpoints/editRecipe/EditRecipeDatabase";
import { EditRecipeBusiness } from "../endpoints/editRecipe/EditRecipeBusiness";
import { EditRecipeController } from "../endpoints/editRecipe/EditRecipeController";
import { DeleteRecipeDatabase } from "../endpoints/deleteRecipe/DeleteRecipeDatabase";
import { DeleteRecipeBusiness } from "../endpoints/deleteRecipe/DeleteRecipeBusiness";
import { DeleteRecipeController } from "../endpoints/deleteRecipe/DeleteRecipeController";

export const recipeRouter = express.Router();

const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();

const createRecipeDatabase = new CreateRecipeDatabase();
const createRecipeBusiness = new CreateRecipeBusiness(
  createRecipeDatabase,
  idGenerator,
  tokenGenerator
);
const createRecipeController = new CreateRecipeController(createRecipeBusiness);

const getRecipeDatabase = new GetRecipeDatabase();
const getRecipeBusiness = new GetRecipeBusiness(
  getRecipeDatabase,
  tokenGenerator
);
const getRecipeController = new GetRecipeController(getRecipeBusiness);

const editRecipeDatabase = new EditRecipeDatabase();
const editRecipeBusiness = new EditRecipeBusiness(
  getRecipeDatabase,
  editRecipeDatabase,
  tokenGenerator
);
const editRecipeController = new EditRecipeController(editRecipeBusiness);

const deleteRecipeDatabase = new DeleteRecipeDatabase();
const deleteRecipeBusiness = new DeleteRecipeBusiness(
  deleteRecipeDatabase,
  tokenGenerator,
  getRecipeDatabase
);
const deleteRecipeController = new DeleteRecipeController(deleteRecipeBusiness);

recipeRouter.post("/createRecipe", (req, res) =>
  createRecipeController.createRecipeController(req, res)
);

recipeRouter.get("/:recipeId", (req, res) =>
  getRecipeController.getRecipe(req, res)
);

recipeRouter.put("/:recipeId", (req, res) =>
  editRecipeController.editRecipe(req, res)
);

recipeRouter.delete("/:recipeId", (req, res) =>
  deleteRecipeController.deleteRecipe(req, res)
);
