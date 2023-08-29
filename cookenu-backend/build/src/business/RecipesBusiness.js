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
exports.RecipeBusiness = void 0;
const Recipe_1 = require("../models/Recipe");
const CustomError_1 = require("../error/CustomError");
const MissingFieldsComplete_1 = require("../error/MissingFieldsComplete");
const CustomErrorToken_1 = require("../error/CustomErrorToken");
class RecipeBusiness {
    constructor(recipeDatabase, idGenerator, tokenGenerator) {
        this.recipeDatabase = recipeDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.createRecipe = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                if (!token) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                if (!input.title || !input.description) {
                    throw new MissingFieldsComplete_1.MissingFieldsToComplete();
                }
                yield this.recipeDatabase.createRecipe(Recipe_1.Recipe.toRecipe(Object.assign(Object.assign({}, input), { id: this.idGenerator.generateId(), deadline: new Date(), authorId: authenticatorData.id })));
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getRecipe = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId = authenticatorData.id;
                if (!userId) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                const result = yield this.recipeDatabase.getRecipe(id);
                if (!result) {
                    throw new Error('Recipe not found.');
                }
                return result;
            }
            catch (error) {
                throw new Error('Error getting recipe: ' + error.message);
            }
        });
        this.editRecipe = (recipeId, newTitle, newDescription, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId = authenticatorData.id;
                const recipe = yield this.recipeDatabase.getRecipe(recipeId);
                if (!recipe) {
                    throw new Error('Recipe not found.');
                }
                if (recipe.authorId !== userId) {
                    console.log('You do not have permission to edit this recipe.');
                    throw new Error('You do not have permission to edit this recipe.');
                }
                const newDeadline = new Date();
                yield this.recipeDatabase.updateRecipe(recipeId, newTitle, newDescription, newDeadline);
            }
            catch (error) {
                console.log('Error in editRecipe:', error.message);
                throw new Error('Unable to edit recipe.');
                // throw new CustomError(400, error.message)
            }
        });
        this.deleteRecipe = (recipeId, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId = authenticatorData.id;
                const recipe = yield this.recipeDatabase.getRecipe(recipeId);
                if (!recipe) {
                    throw new Error('Recipe not found.');
                }
                if (recipe.authorId !== userId && authenticatorData.role !== 'ADMIN') {
                    console.log('You do not have permission to delete this recipe.');
                    throw new Error('You do not have permission to delete this recipe.');
                }
                yield this.recipeDatabase.deleteRecipe(recipeId);
            }
            catch (error) {
                console.log('Error in deleteRecipe:', error.message);
                throw new Error('Unable to delete recipe.');
            }
        });
    }
}
exports.RecipeBusiness = RecipeBusiness;
