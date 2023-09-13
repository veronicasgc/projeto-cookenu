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
exports.EditRecipeBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorRecipes_1 = require("../../error/CustomErrorRecipes");
class EditRecipeBusiness {
    constructor(getRecipeDatabase, editRecipeDatabase, tokenGenerator) {
        this.getRecipeDatabase = getRecipeDatabase;
        this.editRecipeDatabase = editRecipeDatabase;
        this.tokenGenerator = tokenGenerator;
        this.editRecipe = (recipeId, newTitle, newDescription, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId = authenticatorData.id;
                const recipe = yield this.getRecipeDatabase.getRecipe(recipeId);
                if (!recipe) {
                    throw new CustomErrorRecipes_1.RecipeNotFound();
                }
                if (recipe.authorId !== userId) {
                    throw new CustomErrorRecipes_1.UnableToEditRecipe();
                }
                const newDeadline = new Date();
                yield this.editRecipeDatabase.updateRecipe(recipeId, newTitle, newDescription, newDeadline);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.EditRecipeBusiness = EditRecipeBusiness;
