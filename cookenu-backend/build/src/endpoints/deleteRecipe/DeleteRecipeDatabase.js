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
exports.DeleteRecipeDatabase = void 0;
const BaseDatabase_1 = require("../../data/BaseDatabase");
const CustomError_1 = require("../../error/CustomError");
class DeleteRecipeDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.deleteRecipe = (recipeId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield DeleteRecipeDatabase.connection(DeleteRecipeDatabase.TABLE_NAME)
                    .where({ id: recipeId })
                    .delete();
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.DeleteRecipeDatabase = DeleteRecipeDatabase;
DeleteRecipeDatabase.TABLE_NAME = "recipes_table";
