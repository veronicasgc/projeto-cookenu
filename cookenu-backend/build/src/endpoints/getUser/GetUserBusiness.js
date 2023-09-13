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
exports.GetUserBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorToken_1 = require("../../error/CustomErrorToken");
const CustomErrorUser_1 = require("../../error/CustomErrorUser");
class GetUserBusiness {
    constructor(tokenGenerator, getUserDatabase) {
        this.tokenGenerator = tokenGenerator;
        this.getUserDatabase = getUserDatabase;
        this.allUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getUserDatabase.allUsers();
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getUser = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId = authenticatorData.id;
                if (!userId) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                if (!token) {
                    throw new CustomErrorUser_1.UserNotFound();
                }
                const result = yield this.getUserDatabase.getUser(id);
                if (!result) {
                    throw new Error("User not found.");
                }
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.GetUserBusiness = GetUserBusiness;
