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
exports.CreateRecipeBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorRecipes_1 = require("../../error/CustomErrorRecipes");
const CustomErrorToken_1 = require("../../error/CustomErrorToken");
const Recipe_1 = require("../../models/Recipe");
class CreateRecipeBusiness {
    constructor(createRecipeDatabase, idGenerator, tokenGenerator) {
        this.createRecipeDatabase = createRecipeDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.createRecipe = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                if (!token) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                if (!input.title || !input.description) {
                    throw new CustomErrorRecipes_1.RecipeNotCreated();
                }
                yield this.createRecipeDatabase.createRecipe(Recipe_1.Recipe.toRecipe(Object.assign(Object.assign({}, input), { id: this.idGenerator.generateId(), deadline: new Date(), authorId: authenticatorData.id })));
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.CreateRecipeBusiness = CreateRecipeBusiness;
