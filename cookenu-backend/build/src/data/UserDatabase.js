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
exports.UserDatabase = void 0;
const CustomError_1 = require("../error/CustomError");
const TokenGenerator_1 = require("../services/TokenGenerator");
const BaseDatabase_1 = require("./BaseDatabase");
class UserDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.insertUser = (user) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserDatabase.connection.queryBuilder()
                    .insert({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    role: user.role
                })
                    .into(UserDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.findUser = (email) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserDatabase.connection(UserDatabase.TABLE_NAME)
                    .select()
                    .where({ email });
                return result[0];
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.allUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield UserDatabase.connection(UserDatabase.TABLE_NAME)
                    .select();
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const tokenGenerator = new TokenGenerator_1.TokenGenerator();
                const tokenData = tokenGenerator.tokenData(token);
                const userData = yield UserDatabase.connection.queryBuilder()
                    .select('id', 'email')
                    .where({ id: tokenData.id })
                    .from(UserDatabase.TABLE_NAME)
                    .first();
                if (!userData) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                const { id, email } = userData;
                return { id, email };
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "cookenu_users";
