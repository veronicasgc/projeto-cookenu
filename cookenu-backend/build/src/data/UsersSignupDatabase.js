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
exports.UserSignupDatabase = void 0;
const CustomError_1 = require("../error/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class UserSignupDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.UsersSignup = (recipeId, userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield UserSignupDatabase.connection()
                    .select('id')
                    .from('cookenu_users')
                    .where('id', userId)
                    .first();
                const recipe = yield UserSignupDatabase.connection()
                    .select('id')
                    .from('recipes_table')
                    .where('id', recipeId)
                    .first();
                yield UserSignupDatabase.connection().insert({
                    recipe_id: recipe.id,
                    signup_id: user.id,
                }).into('Users_signup');
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.UserSignupDatabase = UserSignupDatabase;
UserSignupDatabase.TABLE_NAME = "users_signup";
