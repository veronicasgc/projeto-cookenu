import express from "express";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

const userBusiness = new UserBusiness(
  new IdGenerator(),
  new TokenGenerator(),
  new HashManager(),
  new UserDatabase()
);

const userController = new UserController(userBusiness, new UserDatabase);

userRouter.post("/signup",(req, res)=> userController.signup(req,res));
userRouter.post("/login",(req, res)=> userController.login(req,res));
userRouter.get("/allUsers",(req, res)=> userController.allUsers(req,res))
userRouter.get("/getUser/:userId",(req, res)=> userController.getUser(req,res))
userRouter.delete("/:userId",(req, res)=> userController.deleteAccount(req, res))
userRouter.post("/forgotPassword", userController.forgotPassword)