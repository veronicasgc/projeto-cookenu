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
exports.ForgotPasswordBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorUser_1 = require("../../error/CustomErrorUser");
class ForgotPasswordBusiness {
    constructor(forgotPasswordDatabase, loginUserDatabase) {
        this.forgotPasswordDatabase = forgotPasswordDatabase;
        this.loginUserDatabase = loginUserDatabase;
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.loginUserDatabase.findUser(email);
                if (!user) {
                    throw new CustomErrorUser_1.UserNotFound();
                }
                const generatedPassword = this.forgotPasswordDatabase.generateRandomPassword();
                yield this.forgotPasswordDatabase.updatePassword(user.id, generatedPassword);
                yield this.forgotPasswordDatabase.setGeneratedPasswordFlag(user.id, true);
                return generatedPassword;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.ForgotPasswordBusiness = ForgotPasswordBusiness;
