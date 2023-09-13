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
exports.LoginUserController = void 0;
class LoginUserController {
    constructor(loginUserBusiness, loginUserDatabase) {
        this.loginUserBusiness = loginUserBusiness;
        this.loginUserDatabase = loginUserDatabase;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                console.log("Login request:", req.body);
                const input = {
                    email,
                    password,
                };
                const token = yield this.loginUserBusiness.login(input);
                let message = "Usuário logado!";
                let isGeneratedPassword = false;
                const user = yield this.loginUserDatabase.findUser(email);
                if (user && password === user.password) {
                    message = "Usuário logado com senha gerada. Por favor, atualize sua senha.";
                    isGeneratedPassword = true;
                }
                res.status(200).send({ message, token, isGeneratedPassword });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.LoginUserController = LoginUserController;
