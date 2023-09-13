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
exports.GetRecipeDatabase = void 0;
const BaseDatabase_1 = require("../../data/BaseDatabase");
const CustomError_1 = require("../../error/CustomError");
class GetRecipeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getRecipe = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const searchResult = yield GetRecipeDatabase.connection.queryBuilder()
                    .select("*")
                    .from("recipes_table")
                    .where('id', recipeId);
                if (searchResult.length === 0) {
                    return null;
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
    }
}
exports.GetRecipeDatabase = GetRecipeDatabase;
GetRecipeDatabase.TABLE_NAME = "recipes_table";
