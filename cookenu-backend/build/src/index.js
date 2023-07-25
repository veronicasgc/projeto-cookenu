"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const userRouter_1 = require("./routes/userRouter");
const recipeRouter_1 = require("./routes/recipeRouter");
const friendshipsRouter_1 = require("./routes/friendshipsRouter");
app_1.default.use('/user/', userRouter_1.userRouter);
app_1.default.use('/recipe/', recipeRouter_1.recipeRouter);
app_1.default.use('/friendships/', friendshipsRouter_1.friendshipRouter);
