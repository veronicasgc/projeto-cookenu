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
                    role: user.role,
                    isGeneratedPassword: true
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
        this.getUser = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = yield UserDatabase.connection.queryBuilder()
                    .select('id', 'name', 'email')
                    .where({ id: userId })
                    .from(UserDatabase.TABLE_NAME)
                    .first();
                if (!userData) {
                    throw new CustomError_1.CustomError(404, 'User not found');
                }
                const { id, name, email } = userData;
                return { id, name, email };
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.deleteAccount = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserDatabase.connection.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    // Delete user's recipes
                    yield trx('recipes_table')
                        .where('author_id', userId)
                        .delete();
                    // Delete user's friendships
                    yield trx('friendships')
                        .where('user_id_1', userId)
                        .orWhere('user_id_2', userId)
                        .delete();
                    // Delete user
                    yield trx(UserDatabase.TABLE_NAME)
                        .where('id', userId)
                        .delete();
                }));
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
    updatePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserDatabase.connection(UserDatabase.TABLE_NAME)
                .where({ id: userId })
                .update({ password: newPassword });
        });
    }
    generateRandomPassword() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newPassword = '';
        for (let i = 0; i < 8; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return newPassword;
    }
    setGeneratedPasswordFlag(userId, isGeneratedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield UserDatabase.connection(UserDatabase.TABLE_NAME)
                    .where({ id: userId })
                    .update({ isGeneratedPassword });
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.UserDatabase = UserDatabase;
UserDatabase.TABLE_NAME = "cookenu_users";
