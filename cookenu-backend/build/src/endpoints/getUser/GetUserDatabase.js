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
exports.GetUserDatabase = void 0;
const BaseDatabase_1 = require("../../data/BaseDatabase");
const CustomError_1 = require("../../error/CustomError");
const CustomErrorUser_1 = require("../../error/CustomErrorUser");
class GetUserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.allUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield GetUserDatabase.connection(GetUserDatabase.TABLE_NAME).select();
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield GetUserDatabase.connection
                    .queryBuilder()
                    .select("id", "name", "email")
                    .where({ id: userId })
                    .from(GetUserDatabase.TABLE_NAME)
                    .first();
                if (!userData) {
                    throw new CustomErrorUser_1.UserNotFound();
                }
                const { id, name, email } = userData;
                return { id, name, email };
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.GetUserDatabase = GetUserDatabase;
GetUserDatabase.TABLE_NAME = "cookenu_users";
