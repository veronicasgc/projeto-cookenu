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
exports.FeedFriendDatabase = void 0;
const CustomError_1 = require("../../error/CustomError");
const BaseDatabase_1 = require("../../data/BaseDatabase");
class FeedFriendDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.getFeedFriends = (userId1) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Getting feed friends for userId:", userId1);
                const friendsRecipes = yield FeedFriendDatabase.connection
                    .select("recipes_table.id as id", "recipes_table.title as title", "recipes_table.description as description", "recipes_table.deadline as deadline", "recipes_table.author_id as userId", "cookenu_users.name as userName")
                    .from("friendships")
                    .innerJoin("cookenu_users", "friendships.user_id_2", "cookenu_users.id")
                    .innerJoin("recipes_table", "friendships.user_id_2", "recipes_table.author_id")
                    .where({
                    "friendships.user_id_1": userId1,
                    "friendships.status": "ACCEPTED",
                })
                    .orderBy("recipes_table.deadline", "asc")
                    .into(FeedFriendDatabase.TABLE_NAME);
                console.log("Fetched friends recipes:", friendsRecipes);
                return friendsRecipes;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.FeedFriendDatabase = FeedFriendDatabase;
FeedFriendDatabase.TABLE_NAME = "friendships";
