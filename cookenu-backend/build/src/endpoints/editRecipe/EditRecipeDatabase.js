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
exports.EditRecipeDatabase = void 0;
const BaseDatabase_1 = require("../../data/BaseDatabase");
const CustomError_1 = require("../../error/CustomError");
class EditRecipeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.updateRecipe = (recipeId, newTitle, newDescription, newDeadline) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield EditRecipeDatabase.connection(EditRecipeDatabase.TABLE_NAME)
                    .where({ id: recipeId })
                    .update({
                    title: newTitle,
                    description: newDescription,
                    deadline: newDeadline
                })
                    .into(EditRecipeDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.EditRecipeDatabase = EditRecipeDatabase;
EditRecipeDatabase.TABLE_NAME = "recipes_table";
