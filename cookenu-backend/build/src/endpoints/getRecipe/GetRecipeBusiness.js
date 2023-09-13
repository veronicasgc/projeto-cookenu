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
exports.GetRecipeBusiness = void 0;
const CustomErrorRecipes_1 = require("../../error/CustomErrorRecipes");
const CustomErrorToken_1 = require("../../error/CustomErrorToken");
class GetRecipeBusiness {
    constructor(getRecipeDatabase, tokenGenerator) {
        this.getRecipeDatabase = getRecipeDatabase;
        this.tokenGenerator = tokenGenerator;
        this.getRecipe = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId = authenticatorData.id;
                if (!userId) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                const result = yield this.getRecipeDatabase.getRecipe(id);
                if (!result) {
                    throw new CustomErrorRecipes_1.RecipeNotFound();
                }
                return result;
            }
            catch (error) {
                throw new Error("Error getting recipe: " + error.message);
            }
        });
    }
}
exports.GetRecipeBusiness = GetRecipeBusiness;
