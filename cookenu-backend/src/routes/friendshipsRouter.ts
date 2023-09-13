import express from "express";
import { MakeFriendshipsController } from "../endpoints/makeFriendship/MakeFriendshipController";
import { UnfollowFriendController } from "../endpoints/unfolloweFriend/UnfollowFrienController";
import { FeedFriendController } from "../endpoints/feedFriend/FeedFriendController";
import { MakeFriendshipDatabase } from "../endpoints/makeFriendship/MakeFriendshipDatabase";
import { MakeFriendshipBusiness } from "../endpoints/makeFriendship/MakeFriendshipBusiness";
import { TokenGenerator } from "../services/TokenGenerator";
import { IdGenerator } from "../services/IdGenerator";
import { UnfollowFriendDatabase } from "../endpoints/unfolloweFriend/UnfollowFriendDatadabase";
import { UnfollowFriendBusiness } from "../endpoints/unfolloweFriend/UnfollowFriendBusiness";
import { FeedFriendDatabase } from "../endpoints/feedFriend/FeedFriendDatabase";
import { FeedFriendBusiness } from "../endpoints/feedFriend/FeedFriendBusiness";

export const friendshipRouter = express.Router();

const idGenerator = new IdGenerator();
const tokenGenerator = new TokenGenerator();

const makeFriendshipDatabase = new MakeFriendshipDatabase();
const makeFriendshipBusiness = new MakeFriendshipBusiness(
  makeFriendshipDatabase,
  idGenerator,
  tokenGenerator
);

const makeFriendshipController = new MakeFriendshipsController(
  makeFriendshipBusiness
);

const unfollowFriendDatabase = new UnfollowFriendDatabase();

const unfollowFriendBusiness = new UnfollowFriendBusiness(
  unfollowFriendDatabase,
  idGenerator,
  tokenGenerator
);

const unfollowFriendController = new UnfollowFriendController(
  unfollowFriendBusiness
);

const feedFriendDatabase = new FeedFriendDatabase();
const feedFriendBusiness = new FeedFriendBusiness(
  feedFriendDatabase,
  tokenGenerator
);
const feedFriendController = new FeedFriendController(feedFriendBusiness);

friendshipRouter.post("/request", (req, res) =>
  makeFriendshipController.beFriend(req, res)
);
friendshipRouter.post("/unfollow", (req, res) =>
  unfollowFriendController.unfollowFriend(req, res)
);
friendshipRouter.get("/feed", (req, res) =>
  feedFriendController.getFeedFriends(req, res)
);
