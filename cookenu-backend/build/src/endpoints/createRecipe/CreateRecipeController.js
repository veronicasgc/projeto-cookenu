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
exports.CreateRecipeController = void 0;
class CreateRecipeController {
    constructor(createRecipeBusiness) {
        this.createRecipeBusiness = createRecipeBusiness;
        this.createRecipeController = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = {
                    title: req.body.title,
                    description: req.body.description,
                };
                yield this.createRecipeBusiness.createRecipe(input, req.headers.authorization);
                res.status(201).send({ message: "Recipe created successfully!" });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.CreateRecipeController = CreateRecipeController;
