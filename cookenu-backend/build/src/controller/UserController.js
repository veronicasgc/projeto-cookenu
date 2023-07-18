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
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
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
                const input = {
                    email,
                    password,
                };
                const token = yield this.userBusiness.login(input);
                res.status(200).send({ message: "Usuário logado!", token });
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        //pegar todos usuários existentes
        this.allUsers = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userBusiness.allUsers();
                res.status(201).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
        //PEGAR ID E EMAIL DO USUÁRIO CADASTRADO ATRAVÉS DO TOKEN FORNECIDO NO LOGIN
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.params.token;
                const result = yield this.userBusiness.getUser(token);
                res.status(201).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.UserController = UserController;
