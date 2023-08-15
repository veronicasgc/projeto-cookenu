"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipesController = void 0;
const RecipesBusiness_1 = require("../business/RecipesBusiness");
const IdGenerator_1 = require("../services/IdGenerator");
const RecipesDatabase_1 = require("../data/RecipesDatabase");
const TokenGenerator_1 = require("../services/TokenGenerator");
class RecipesController {
    constructor() {
        this.createRecipeController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    title: req.body.title,
                    description: req.body.description,
                };
                const recipeBusiness = new RecipesBusiness_1.RecipeBusiness(new RecipesDatabase_1.RecipeDatabase, new IdGenerator_1.IdGenerator, new TokenGenerator_1.TokenGenerator);
                yield recipeBusiness.createRecipe(input, req.headers.authorization);
                res.status(201).send({ message: "Receita criada com sucesso!" });
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
        this.getRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { recipeId } = req.params;
                if (!recipeId) {
                    res.status(404).send({ message: 'Recipe not found!' });
                    return;
                }
                const token = req.headers.authorization;
                if (!token) {
                    res.status(401).send({ message: "Invalid token!" });
                    return;
                }
                const recipeBusiness = new RecipesBusiness_1.RecipeBusiness(new RecipesDatabase_1.RecipeDatabase, new IdGenerator_1.IdGenerator, new TokenGenerator_1.TokenGenerator);
                const result = yield recipeBusiness.getRecipe(recipeId, token);
                if (!result) {
                    res.status(404).send({ message: 'Recipe not found!' });
                    return;
                }
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
        this.editRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const recipeId = req.params.recipeId;
                const { newTitle, newDescription } = req.body;
                const recipeBusiness = new RecipesBusiness_1.RecipeBusiness(new RecipesDatabase_1.RecipeDatabase, new IdGenerator_1.IdGenerator, new TokenGenerator_1.TokenGenerator);
                const token = req.headers.authorization;
                yield recipeBusiness.editRecipe(recipeId, newTitle, newDescription, token);
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.RecipesController = RecipesController;
