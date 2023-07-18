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
const CustomError_1 = require("../error/CustomError");
class RecipeBusiness {
    constructor(recipeDatabase, idGenerator, tokenGenerator) {
        this.recipeDatabase = recipeDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.createRecipe = (token, recipe) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Verificar se o token está presente e no formato correto
                if (!token || !token.startsWith("Bearer ")) {
                    throw new Error("Token de autorização ausente ou formato inválido");
                }
                // Extrair o token sem o prefixo "Bearer "
                const tokenWithoutPrefix = token.slice(7);
                // Validar e extrair os dados do token
                const tokenData = this.tokenGenerator.tokenData(tokenWithoutPrefix);
                // Verificar se o usuário está logado
                if (!tokenData.id) {
                    throw new Error("Usuário não autenticado");
                }
                // Definir a data atual para a propriedade "deadline" do objeto "recipe"
                recipe.deadline = new Date();
                // Atribuir o ID do usuário logado para a propriedade "author_id" do objeto "recipe"
                recipe.authorId = tokenData.id;
                const result = yield this.recipeDatabase.createRecipe(recipe);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getRecipeById = (title) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.recipeDatabase.getRecipeById(title);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
                ;
            }
        });
    }
}
exports.RecipeBusiness = RecipeBusiness;
