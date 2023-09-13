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
exports.CreateUserBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorUser_1 = require("../../error/CustomErrorUser");
const MissingFieldsComplete_1 = require("../../error/MissingFieldsComplete");
const User_1 = require("../../models/User");
class CreateUserBusiness {
    constructor(idGenerator, tokenGenerator, hashManager, createUserDatabase) {
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.hashManager = hashManager;
        this.createUserDatabase = createUserDatabase;
        this.createUser = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = input;
                let role = input.role;
                if (!name || !email || !password || !role) {
                    throw new MissingFieldsComplete_1.MissingFieldsToComplete();
                }
                if (name.length < 4) {
                    throw new CustomErrorUser_1.InvalidName();
                }
                if (password.length < 6) {
                    throw new CustomErrorUser_1.InvalidPasswordCharacters();
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
                const newUser = {
                    id,
                    name,
                    email,
                    password: hashPassword,
                    role: User_1.UserRole[role],
                };
                // if (user.email === email) {
                //   throw new CustomError(400,'Email já cadastrado!');;
                // }
                yield this.createUserDatabase.insertUser(newUser);
                const token = this.tokenGenerator.generateToken(id, newUser.role);
                return token;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.CreateUserBusiness = CreateUserBusiness;
