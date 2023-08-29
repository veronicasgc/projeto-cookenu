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
exports.UserController = void 0;
class UserController {
    constructor(userBusiness, userDatabase) {
        this.userBusiness = userBusiness;
        this.userDatabase = userDatabase;
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, role } = req.body; //, role 
                const input = {
                    name,
                    email,
                    password,
                    role
                };
                const token = yield this.userBusiness.createUser(input);
                res.status(201).send({ message: "Usuário criado!", token });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log("Login request:", req.body);
                const input = {
                    email,
                    password,
                };
                const token = yield this.userBusiness.login(input);
                console.log("Generated token:", token);
                let message = "Usuário logado!";
                let generatedPasswordUsed = false;
                const user = yield this.userDatabase.findUser(email);
                console.log("User in Controller:", user);
                if (user && password === user.generatedPassword) {
                    message = "Usuário logado com senha gerada. Por favor, atualize sua senha.";
                    generatedPasswordUsed = true;
                }
                res.status(200).send({ message, token, generatedPasswordUsed });
            }
            catch (error) {
                console.log("Controller error:", error);
                res.status(400).send(error.message);
            }
        });
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userBusiness.allUsers();
                res.status(201).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.headers.token;
                const userId = req.params.userId;
                const result = yield this.userBusiness.getUser(userId, token);
                res.status(201).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        this.deleteAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const token = req.headers.authorization;
                yield this.userBusiness.deleteAccount(userId, token);
                res.status(200).send('Account deteled successfully.');
            }
            catch (error) {
                console.log('Controller error:', error);
                res.status(400).send(error);
            }
        });
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const newPassword = yield this.userBusiness.forgotPassword(email);
                res.status(200).send(`Password reset successfully.Your new password is: ${newPassword}`);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
