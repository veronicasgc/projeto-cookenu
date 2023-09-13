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
exports.DeleteRecipeBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorRecipes_1 = require("../../error/CustomErrorRecipes");
class DeleteRecipeBusiness {
    constructor(deleteRecipeDatabase, tokenGenerator, getRecipeDatabase) {
        this.deleteRecipeDatabase = deleteRecipeDatabase;
        this.tokenGenerator = tokenGenerator;
        this.getRecipeDatabase = getRecipeDatabase;
        this.deleteRecipe = (recipeId, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Deleting recipe. Recipe ID:", recipeId, "Token:", token);
                const authenticatorData = this.tokenGenerator.tokenData(token);
                console.log("Authenticator Data:", authenticatorData);
                const userId = authenticatorData.id;
                console.log("User ID:", userId);
                const recipe = yield this.getRecipeDatabase.getRecipe(recipeId);
                console.log("Recipe:", recipe);
                if (!recipe) {
                    throw new CustomErrorRecipes_1.RecipeNotFound();
                }
                console.log("Author ID:", recipe.authorId);
                if (recipe.authorId !== userId && authenticatorData.role !== "ADMIN") {
                    console.log("Unable to delete recipe. Condition met.");
                    throw new CustomErrorRecipes_1.UnableToDeleteRecipe();
                }
                console.log("Deleting recipe...");
                yield this.deleteRecipeDatabase.deleteRecipe(recipeId);
                console.log("Recipe deleted.");
            }
            catch (error) {
                console.error("Error:", error);
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.DeleteRecipeBusiness = DeleteRecipeBusiness;
