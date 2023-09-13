"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeRouter = void 0;
const express_1 = __importDefault(require("express"));
const CreateRecipeDatabase_1 = require("../endpoints/createRecipe/CreateRecipeDatabase");
const CreateRecipeBusiness_1 = require("../endpoints/createRecipe/CreateRecipeBusiness");
const CreateRecipeController_1 = require("../endpoints/createRecipe/CreateRecipeController");
const TokenGenerator_1 = require("../services/TokenGenerator");
const IdGenerator_1 = require("../services/IdGenerator");
const GetRecipeController_1 = require("../endpoints/getRecipe/GetRecipeController");
const GetRecipeBusiness_1 = require("../endpoints/getRecipe/GetRecipeBusiness");
const GetRecipeDatabase_1 = require("../endpoints/getRecipe/GetRecipeDatabase");
const EditRecipeDatabase_1 = require("../endpoints/editRecipe/EditRecipeDatabase");
const EditRecipeBusiness_1 = require("../endpoints/editRecipe/EditRecipeBusiness");
const EditRecipeController_1 = require("../endpoints/editRecipe/EditRecipeController");
const DeleteRecipeDatabase_1 = require("../endpoints/deleteRecipe/DeleteRecipeDatabase");
const DeleteRecipeBusiness_1 = require("../endpoints/deleteRecipe/DeleteRecipeBusiness");
const DeleteRecipeController_1 = require("../endpoints/deleteRecipe/DeleteRecipeController");
exports.recipeRouter = express_1.default.Router();
const tokenGenerator = new TokenGenerator_1.TokenGenerator();
const idGenerator = new IdGenerator_1.IdGenerator();
const createRecipeDatabase = new CreateRecipeDatabase_1.CreateRecipeDatabase();
const createRecipeBusiness = new CreateRecipeBusiness_1.CreateRecipeBusiness(createRecipeDatabase, idGenerator, tokenGenerator);
const createRecipeController = new CreateRecipeController_1.CreateRecipeController(createRecipeBusiness);
const getRecipeDatabase = new GetRecipeDatabase_1.GetRecipeDatabase();
const getRecipeBusiness = new GetRecipeBusiness_1.GetRecipeBusiness(getRecipeDatabase, tokenGenerator);
const getRecipeController = new GetRecipeController_1.GetRecipeController(getRecipeBusiness);
const editRecipeDatabase = new EditRecipeDatabase_1.EditRecipeDatabase();
const editRecipeBusiness = new EditRecipeBusiness_1.EditRecipeBusiness(getRecipeDatabase, editRecipeDatabase, tokenGenerator);
const editRecipeController = new EditRecipeController_1.EditRecipeController(editRecipeBusiness);
const deleteRecipeDatabase = new DeleteRecipeDatabase_1.DeleteRecipeDatabase();
const deleteRecipeBusiness = new DeleteRecipeBusiness_1.DeleteRecipeBusiness(deleteRecipeDatabase, tokenGenerator, getRecipeDatabase);
const deleteRecipeController = new DeleteRecipeController_1.DeleteRecipeController(deleteRecipeBusiness);
exports.recipeRouter.post("/createRecipe", (req, res) => createRecipeController.createRecipeController(req, res));
exports.recipeRouter.get("/:recipeId", (req, res) => getRecipeController.getRecipe(req, res));
exports.recipeRouter.put("/:recipeId", (req, res) => editRecipeController.editRecipe(req, res));
exports.recipeRouter.delete("/:recipeId", (req, res) => deleteRecipeController.deleteRecipe(req, res));
