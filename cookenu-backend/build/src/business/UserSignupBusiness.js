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
exports.UserSignupBusiness = void 0;
const UsersSignupDatabase_1 = require("../data/UsersSignupDatabase");
class UserSignupBusiness {
    constructor(userSignupDatabase = UsersSignupDatabase_1.UserSignupDatabase) {
        this.userSignupDatabase = userSignupDatabase;
        this.UserSignup = (input) => __awaiter(this, void 0, void 0, function* () {
            const { recipeId, signupId } = input;
            if (!signupId || !recipeId) {
                throw new Error('User or recipe not found.');
            }
        });
    }
}
exports.UserSignupBusiness = UserSignupBusiness;
