"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendshipRouter = void 0;
const express_1 = __importDefault(require("express"));
const FriendshipsController_1 = require("../controller/FriendshipsController");
const FriendshipsBusiness_1 = require("../business/FriendshipsBusiness");
const FriendshipsDatabase_1 = require("../data/FriendshipsDatabase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenGenerator_1 = require("../services/TokenGenerator");
exports.friendshipRouter = express_1.default.Router();
const friendshipsDatabase = new FriendshipsDatabase_1.FriendshipsDatabase();
const friendshipsBusiness = new FriendshipsBusiness_1.FriendshipsBusiness(friendshipsDatabase, new IdGenerator_1.IdGenerator(), new TokenGenerator_1.TokenGenerator());
const friendshipsController = new FriendshipsController_1.FriendshipsController(friendshipsBusiness);
exports.friendshipRouter.post("/request", friendshipsController.beFriend);
exports.friendshipRouter.post("/unfollow", friendshipsController.unfollowFriend);
exports.friendshipRouter.get("/feed", friendshipsController.getFeedFriends);
