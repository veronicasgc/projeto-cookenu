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
exports.MakeFriendshipBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorFriend_1 = require("../../error/CustomErrorFriend");
class MakeFriendshipBusiness {
    constructor(makeFriendshipDatabase, idGenerator, tokenGenerator) {
        this.makeFriendshipDatabase = makeFriendshipDatabase;
        this.idGenerator = idGenerator;
        this.tokenGenerator = tokenGenerator;
        this.beFriend = (input, token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!input.userId2 || input.userId2.trim() === "") {
                    throw new CustomErrorFriend_1.InvalidMakeFriendship();
                }
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId1 = authenticatorData.id;
                if (userId1 === input.userId2) {
                    throw new CustomErrorFriend_1.InvalidToBeYourFriend();
                }
                const existingRequest = yield this.makeFriendshipDatabase.getFriendshipByUsers({
                    userId1,
                    userId2: input.userId2,
                });
                if (existingRequest) {
                    if (existingRequest.status === "PENDING") {
                        yield this.makeFriendshipDatabase.updateFriendshipStatus(existingRequest.id, "ACCEPTED");
                    }
                    else if (existingRequest.status === "ACCEPTED") {
                        throw new CustomErrorFriend_1.InvalidBeFriendsAgain();
                    }
                }
                else {
                    const friend = {
                        id: this.idGenerator.generateId(),
                        userId1,
                        userId2: input.userId2,
                        status: "PENDING",
                    };
                    yield this.makeFriendshipDatabase.beFriend(friend);
                }
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.MakeFriendshipBusiness = MakeFriendshipBusiness;
