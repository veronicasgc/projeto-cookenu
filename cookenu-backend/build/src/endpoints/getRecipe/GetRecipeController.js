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
exports.GetRecipeController = void 0;
class GetRecipeController {
    constructor(getRecipeBusiness) {
        this.getRecipeBusiness = getRecipeBusiness;
        this.getRecipe = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { recipeId } = req.params;
                if (!recipeId) {
                    res.status(404).send({ message: 'Recipe not found!' });
                    return;
                }
                const token = req.headers.authorization;
                if (!token) {
                    res.status(401).send({ message: "Invalid token!" });
                    return;
                }
                const result = yield this.getRecipeBusiness.getRecipe(recipeId, token);
                if (!result) {
                    res.status(404).send({ message: 'Recipe not found!' });
                    return;
                }
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send({ error: error.message });
            }
        });
    }
}
exports.GetRecipeController = GetRecipeController;
