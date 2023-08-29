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
exports.UserBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const CustomErrorToken_1 = require("../error/CustomErrorToken");
const CustomErrorUser_1 = require("../error/CustomErrorUser");
const MissingFieldsComplete_1 = require("../error/MissingFieldsComplete");
const User_1 = require("../models/User");
class UserBusiness {
    constructor(idGenerator, tokenGenerator, hashManager, userDatabase) {
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.hashManager = hashManager;
        this.userDatabase = userDatabase;
        this.createUser = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = input;
                let role = input.role;
                if (!name || !email || !password || !role) {
                    throw new CustomError_1.CustomError(400, 'Preencha os campos "name", "email", "password" e "role"');
                }
                if (name.length < 4) {
                    throw new CustomErrorUser_1.InvalidName();
                }
                if (password.length < 6) {
                    throw new CustomErrorUser_1.InvalidPassword();
                }
                if (!email.includes("@")) {
                    throw new CustomErrorUser_1.InvalidEmail();
                }
                if (role !== "NORMAL" && role !== "ADMIN") {
                    throw new CustomErrorUser_1.InvalidRole();
                }
                if (role !== "NORMAL" && role !== "ADMIN") {
                    role = "NORMAL";
                }
                const id = this.idGenerator.generateId();
                const hashPassword = yield this.hashManager.hash(password);
                const user = {
                    id,
                    name,
                    email,
                    password: hashPassword,
                    role: User_1.UserRole[role]
                };
                // if (user.email === email) {
                //   throw new CustomError(400,'Email já cadastrado!');;
                // }
                yield this.userDatabase.insertUser(user);
                const token = this.tokenGenerator.generateToken(id, user.role);
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = input;
                console.log("Login input:", input);
                if (!email || !password) {
                    throw new MissingFieldsComplete_1.MissingFieldsToComplete();
                }
                if (!email.includes("@")) {
                    throw new CustomErrorUser_1.InvalidEmail();
                }
                const user = yield this.userDatabase.findUser(email);
                console.log("User:", user);
                if (!user) {
                    throw new CustomErrorUser_1.UserNotFound();
                }
                let isValidPassword = false;
                if (user.isGeneratedPassword && password === user.generatedPassword) {
                    isValidPassword = true;
                }
                else {
                    isValidPassword = yield this.hashManager.compare(password, user.password);
                }
                // if (!isValidPassword) {
                //   throw new InvalidPassword();
                // }
                const token = this.tokenGenerator.generateToken(user.id, user.role);
                return token;
            }
            catch (error) {
                console.log("Error in login:", error.message);
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.allUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userDatabase.allUsers();
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
                    throw new CustomErrorUser_1.UserNotFound;
                }
                const result = yield this.userDatabase.getUser(id);
                if (!result) {
                    throw new Error('User not found.');
                }
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.deleteAccount = (id, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const authenticatorData = this.tokenGenerator.tokenData(token);
                if (authenticatorData.role === 'NORMAL' && authenticatorData.id !== id) {
                    throw new Error('You do not have permission to delete this account.');
                }
                yield this.userDatabase.deleteAccount(id);
            }
            catch (error) {
                console.log('Error in deleteAccount:', error.message);
                throw new Error('Unable to delete account.');
            }
        });
    }
    forgotPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userDatabase.findUser(email);
                if (!user) {
                    throw new Error('Email not found.');
                }
                const generatedPassword = this.userDatabase.generateRandomPassword();
                yield this.userDatabase.updatePassword(user.id, generatedPassword);
                return generatedPassword;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
