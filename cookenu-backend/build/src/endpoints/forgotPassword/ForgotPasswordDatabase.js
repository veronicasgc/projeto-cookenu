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
exports.ForgotPasswordDatabase = void 0;
const BaseDatabase_1 = require("../../data/BaseDatabase");
const CustomError_1 = require("../../error/CustomError");
class ForgotPasswordDatabase extends BaseDatabase_1.BaseDatabase {
    updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ForgotPasswordDatabase.connection(ForgotPasswordDatabase.TABLE_NAME)
                    .where({ id: userId })
                    .update({ password: newPassword });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
    generateRandomPassword() {
        try {
            const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            let newPassword = "";
            for (let i = 0; i < 8; i++) {
                newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return newPassword;
        }
        catch (error) {
            throw new CustomError_1.CustomError(400, error.message);
        }
    }
    setGeneratedPasswordFlag(userId, isGeneratedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ForgotPasswordDatabase.connection(ForgotPasswordDatabase.TABLE_NAME)
                    .where({ id: userId })
                    .update({ isGeneratedPassword });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.ForgotPasswordDatabase = ForgotPasswordDatabase;
ForgotPasswordDatabase.TABLE_NAME = "cookenu_users";
