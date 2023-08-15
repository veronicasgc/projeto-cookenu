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
exports.FriendshipsBusiness = void 0;
const CustomError_1 = require("../error/CustomError");
const CustomErrorFriend_1 = require("../error/CustomErrorFriend");
const CustomErrorToken_1 = require("../error/CustomErrorToken");
class FriendshipsBusiness {
    constructor(friendshipsDatabase, idGenerator, tokenGenerator) {
        this.friendshipsDatabase = friendshipsDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.beFriend = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.userId2 || input.userId2.trim() === '') {
                    throw new Error('Invalid userToFollowId.');
                }
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId1 = authenticatorData.id;
                if (userId1 === input.userId2) {
                    throw new CustomErrorFriend_1.invalidYouBeYourFriend();
                }
                const existingRequest = yield this.friendshipsDatabase.getFriendshipByUsers({
                    userId1,
                    userId2: input.userId2,
                });
                if (existingRequest && existingRequest.status === 'PENDING') {
                    yield this.friendshipsDatabase.updateFriendshipStatus(existingRequest.id, 'ACCEPTED');
                }
                else {
                    const friend = {
                        id: this.idGenerator.generateId(),
                        userId1,
                        userId2: input.userId2,
                        status: 'PENDING',
                    };
                    yield this.friendshipsDatabase.beFriend(friend);
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.unfollowFriend = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.userId2 || input.userId2.trim() === '') {
                    throw new Error('Invalid userToFollowId.');
                }
                const authenticatorData = this.tokenGenerator.tokenData(token);
                if (!token) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                const userId1 = authenticatorData.id;
                if (userId1 === input.userId2) {
                    throw new CustomErrorFriend_1.invalidYouBeYourFriend();
                }
                const existingRequest = yield this.friendshipsDatabase.getFriendshipByUsers({
                    userId1,
                    userId2: input.userId2,
                });
                if (existingRequest && existingRequest.status === 'ACCEPTED') {
                    yield this.friendshipsDatabase.updateFriendshipStatus(existingRequest.id, 'PENDING');
                }
                else {
                    const friend = {
                        id: this.idGenerator.generateId(),
                        userId1,
                        userId2: input.userId2,
                        status: 'PENDING',
                    };
                    yield this.friendshipsDatabase.beFriend(friend);
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
        this.getFeedFriends = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId1 = authenticatorData.id;
                const result = yield this.friendshipsDatabase.getFeedFriends(userId1);
                const recipes = result.map((recipe) => ({
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description,
                    deadline: recipe.deadline,
                    userId: recipe.userId,
                    userName: recipe.userName,
                }));
                return { recipes };
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode || 500, error.message);
            }
        });
    }
}
exports.FriendshipsBusiness = FriendshipsBusiness;
