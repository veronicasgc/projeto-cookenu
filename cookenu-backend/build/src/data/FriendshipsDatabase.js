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
exports.FriendshipsDatabase = void 0;
const CustomError_1 = require("../error/CustomError");
const BaseDatabase_1 = require("./BaseDatabase");
class FriendshipsDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.beFriend = (friend) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield FriendshipsDatabase.connection.queryBuilder()
                    .insert({
                    id: friend.id,
                    user_id_1: friend.userId1,
                    user_id_2: friend.userId2,
                    status: 'PENDING',
                }).into(FriendshipsDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getFriendshipByUsers = (friend) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield FriendshipsDatabase.connection.queryBuilder()
                    .select()
                    .from(FriendshipsDatabase.TABLE_NAME)
                    .where(function () {
                    this.where({ user_id_1: friend.userId1,
                        user_id_2: friend.userId2
                    }).orWhere({ user_id_1: friend.userId2,
                        user_id_2: friend.userId1
                    });
                });
                if (result.length > 0) {
                    return {
                        id: result[0].id,
                        userId1: result[0].user_id_1,
                        userId2: result[0].user_id_2,
                        status: result[0].status,
                    };
                }
                return null;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.updateFriendshipStatus = (friendshipId, status) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield FriendshipsDatabase.connection.queryBuilder()
                    .update({ status })
                    .where({ id: friendshipId })
                    .into(FriendshipsDatabase.TABLE_NAME);
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getFeedFriends = (sort, order) => __awaiter(this, void 0, void 0, function* () {
            try {
                const friendsRecipes = yield FriendshipsDatabase.connection
                    .select("friendships", "cookenu_users.name as Usuário", "recipes_table.title", "recipes_table.description", "recipes_table.deadline", "recipes_table.author_id")
                    .innerJoin("cookenu_users", "friendships.id", "cookenu_users.id")
                    .innerJoin("recipes_table", "friendships.id", "recipes_table.author_id")
                    .where({ "friendships.status": "ACCEPTED" })
                    .orderBy(order, sort)
                    .into(FriendshipsDatabase.TABLE_NAME);
                return friendsRecipes;
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.FriendshipsDatabase = FriendshipsDatabase;
FriendshipsDatabase.TABLE_NAME = "friendships";
