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
exports.DeleteRecipeController = void 0;
class DeleteRecipeController {
    constructor(deleteRecipeBusiness) {
        this.deleteRecipeBusiness = deleteRecipeBusiness;
        this.deleteRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const recipeId = req.params.recipeId;
                const token = req.headers.authorization;
                yield this.deleteRecipeBusiness.deleteRecipe(recipeId, token);
                res.status(200).send('Recipe deteled successfully.');
            }
            catch (error) {
                res.status(400).send(error);
            }
        });
    }
}
exports.DeleteRecipeController = DeleteRecipeController;
