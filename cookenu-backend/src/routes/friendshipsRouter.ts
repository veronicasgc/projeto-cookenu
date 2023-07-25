import express from "express";
import { FriendshipsController } from "../controller/FriendshipsController";
import { FriendshipsBusiness } from "../business/FriendshipsBusiness";
import { FriendshipsDatabase } from "../data/FriendshipsDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";

export const friendshipRouter = express.Router();

const friendshipsDatabase = new FriendshipsDatabase()

const friendshipsBusiness = new FriendshipsBusiness(friendshipsDatabase,
    new IdGenerator(), new TokenGenerator())

const friendshipsController = new FriendshipsController(friendshipsBusiness)

friendshipRouter.post("/request", friendshipsController.beFriend)
friendshipRouter.post("/unfollow", friendshipsController.unfollowFriend)
friendshipRouter.get("/feed", friendshipsController.getFeedFriends)