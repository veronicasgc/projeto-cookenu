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
                    throw new CustomError_1.InvalidName();
                }
                if (password.length < 6) {
                    throw new CustomError_1.InvalidPassword();
                }
                if (!email.includes("@")) {
                    throw new CustomError_1.InvalidEmail();
                }
                if (role !== "NORMAL" && role !== "ADMIN") {
                    throw new CustomError_1.InvalidRole();
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
                if (!email || !password) {
                    throw new CustomError_1.CustomError(400, 'Preencha os campos"email" e "password"');
                }
                if (!email.includes("@")) {
                    throw new CustomError_1.InvalidEmail();
                }
                const user = yield this.userDatabase.findUser(email);
                if (!user) {
                    throw new CustomError_1.UserNotFound();
                }
                const isValidPassword = yield this.hashManager.compare(password, user.password);
                if (!isValidPassword) {
                    throw new CustomError_1.InvalidPassword();
                }
                const token = this.tokenGenerator.generateToken(user.id, user.role);
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        //pegar todos usuários existentes
        this.allUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userDatabase.allUsers();
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        //  PEGAR ID E EMAIL DO USUÁRIO CADASTRADO ATRAVÉS DO TOKEN FORNECIDO NO LOGIN
        this.getUser = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userDatabase.getUser(token);
                return result;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.UserBusiness = UserBusiness;
