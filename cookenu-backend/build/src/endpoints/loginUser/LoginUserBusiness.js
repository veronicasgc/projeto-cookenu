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
exports.LoginUserBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorUser_1 = require("../../error/CustomErrorUser");
const MissingFieldsComplete_1 = require("../../error/MissingFieldsComplete");
class LoginUserBusiness {
    constructor(tokenGenerator, hashManager, loginUserDatabase) {
        this.tokenGenerator = tokenGenerator;
        this.hashManager = hashManager;
        this.loginUserDatabase = loginUserDatabase;
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                if (!email || !password) {
                    throw new MissingFieldsComplete_1.MissingFieldsToComplete();
                }
                if (!email.includes("@")) {
                    throw new CustomErrorUser_1.InvalidEmail();
                }
                const user = yield this.loginUserDatabase.findUser(email);
                if (!user) {
                    throw new CustomErrorUser_1.UserNotFound();
                }
                let isValidPassword = false;
                if (user.isGeneratedPassword && password === user.password) {
                    isValidPassword = true;
                }
                else {
                    isValidPassword = yield this.hashManager.compare(password, user.password);
                }
                if (!isValidPassword) {
                    throw new CustomErrorUser_1.InvalidPassword();
                }
                const token = this.tokenGenerator.generateToken(user.id, user.role);
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.LoginUserBusiness = LoginUserBusiness;
