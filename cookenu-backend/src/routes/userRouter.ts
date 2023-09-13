import express from "express";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { CreateUserDatabase } from "../endpoints/createUser/CreateUserDatabase";
import { CreateUserBusiness } from "../endpoints/createUser/CreateUserBusiness";
import { CreateUserController } from "../endpoints/createUser/CreateUserController";
import { LoginUserDatabase } from "../endpoints/loginUser/LoginUserDatabase";
import { LoginUserBusiness } from "../endpoints/loginUser/LoginUserBusiness";
import { LoginUserController } from "../endpoints/loginUser/LoginUserController";
import { GetUserDatabase } from "../endpoints/getUser/GetUserDatabase";
import { GetUserBusiness } from "../endpoints/getUser/GetUserBusiness";
import { GetUserController } from "../endpoints/getUser/GetUserController";
import { DeleteAccountDatabase } from "../endpoints/deleteAccount/DeleteAccountDatabase";
import { DeleteAccountBusiness } from "../endpoints/deleteAccount/DeleteAccountBusiness";
import { DeleteAccountController } from "../endpoints/deleteAccount/DeleteAccountController";
import { ForgotPasswordDatabase } from "../endpoints/forgotPassword/ForgotPasswordDatabase";
import { ForgotPasswordBusiness } from "../endpoints/forgotPassword/ForgotPasswordBusiness";
import { ForgotPasswordController } from "../endpoints/forgotPassword/ForgotPasswordController";

export const userRouter = express.Router();

const tokenGenerator = new TokenGenerator();
const idGenerator = new IdGenerator();
const hashManager = new HashManager();

const createUserDatabase = new CreateUserDatabase();
const createUserBusiness = new CreateUserBusiness(
  idGenerator,
  tokenGenerator,
  hashManager,
  createUserDatabase
);
const createUserController = new CreateUserController(createUserBusiness);

const loginUserDatabase = new LoginUserDatabase();
const loginUserBusiness = new LoginUserBusiness(
  tokenGenerator,
  hashManager,
  loginUserDatabase
);
const loginUserController = new LoginUserController(
  loginUserBusiness,
  loginUserDatabase
);

const getUserDatabase = new GetUserDatabase();
const getUserBusiness = new GetUserBusiness(tokenGenerator, getUserDatabase);
const getUserController = new GetUserController(getUserBusiness);

const deleteAccountDatabase = new DeleteAccountDatabase();
const deleteAccountBusiness = new DeleteAccountBusiness(
  tokenGenerator,
  deleteAccountDatabase
);
const deleteAccountController = new DeleteAccountController(
  deleteAccountBusiness
);

const forgotPasswordDatabase = new ForgotPasswordDatabase();
const forgotPasswordBusiness = new ForgotPasswordBusiness(
  forgotPasswordDatabase,
  loginUserDatabase
);
const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordBusiness
);

userRouter.post("/signup", (req, res) => createUserController.signup(req, res));
userRouter.post("/login", (req, res) => loginUserController.login(req, res));
userRouter.get("/allUsers", (req, res) => getUserController.allUsers(req, res));
userRouter.get("/getUser/:userId", (req, res) =>
  getUserController.getUser(req, res)
);
userRouter.delete("/:userId", (req, res) =>
  deleteAccountController.deleteAccount(req, res)
);
userRouter.post("/forgotPassword", (req, res) =>
  forgotPasswordController.forgotPassword(req, res)
);
