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
exports.RecipeDatabase = void 0;
const CustomError_1 = require("../error/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class RecipeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.createRecipe = (recipe) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield RecipeDatabase.connection.queryBuilder()
                    .insert({
                    id: recipe.getId(),
                    title: recipe.getTitle(),
                    description: recipe.getDescription(),
                    deadline: recipe.getDeadline(),
                    author_id: recipe.getAuthorId(),
                })
                    .into(RecipeDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getRecipe = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchResult = yield RecipeDatabase.connection.queryBuilder()
                    .select("*")
                    .from("recipes_table")
                    .where('id', recipeId);
                if (searchResult.length === 0) {
                    return null; // Retorna null quando a receita não é encontrada
                }
                const recipeResult = {
                    title: searchResult[0].title,
                    description: searchResult[0].description,
                    deadline: searchResult[0].deadline,
                    authorId: searchResult[0].author_id,
                };
                return recipeResult;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.updateRecipe = (recipeId, newTitle, newDescription, newDeadline) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
                    .where({ id: recipeId })
                    .update({
                    title: newTitle,
                    description: newDescription,
                    deadline: newDeadline
                })
                    .into(RecipeDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new Error('Unable to update recipe.');
                // throw new CustomError(400, error.message);
            }
        });
        this.deleteRecipe = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
                    .where({ id: recipeId })
                    .delete();
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.RecipeDatabase = RecipeDatabase;
RecipeDatabase.TABLE_NAME = "recipes_table";
