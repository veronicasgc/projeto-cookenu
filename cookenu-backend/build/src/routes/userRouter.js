"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserBusiness_1 = require("../business/UserBusiness");
const UserDatabase_1 = require("../data/UserDatabase");
const HashManager_1 = require("../services/HashManager");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenGenerator_1 = require("../services/TokenGenerator");
const UserController_1 = require("../controller/UserController");
exports.userRouter = express_1.default.Router();
const userBusiness = new UserBusiness_1.UserBusiness(new IdGenerator_1.IdGenerator(), new TokenGenerator_1.TokenGenerator(), new HashManager_1.HashManager(), new UserDatabase_1.UserDatabase());
const userController = new UserController_1.UserController(userBusiness, new UserDatabase_1.UserDatabase);
exports.userRouter.post("/signup", (req, res) => userController.signup(req, res));
exports.userRouter.post("/login", (req, res) => userController.login(req, res));
exports.userRouter.get("/allUsers", (req, res) => userController.allUsers(req, res));
exports.userRouter.get("/getUser/:userId", (req, res) => userController.getUser(req, res));
exports.userRouter.delete("/:userId", (req, res) => userController.deleteAccount(req, res));
exports.userRouter.post("/forgotPassword", userController.forgotPassword);
