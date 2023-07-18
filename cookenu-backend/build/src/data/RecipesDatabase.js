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
                    .insert(recipe)
                    .into(RecipeDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getRecipeById = (title) => __awaiter(this, void 0, void 0, function* () {
            const searchResult = yield RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
                .select("*")
                .where({ title });
            const recipeResult = {
                title: searchResult[0].title,
                description: searchResult[0].description,
                deadline: searchResult[0].deadline,
                authorId: searchResult[0].author_id,
            };
            return recipeResult;
        });
    }
    generateId() {
        throw new Error("Method not implemented.");
    }
}
exports.RecipeDatabase = RecipeDatabase;
RecipeDatabase.TABLE_NAME = "Recipes_table";
