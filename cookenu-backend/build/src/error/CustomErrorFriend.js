"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendNotFound = exports.InvalidMakeFriendship = exports.InvalidBeFriendsAgain = exports.InvalidToBeYourFriend = void 0;
const CustomError_1 = require("./CustomError");
class InvalidToBeYourFriend extends CustomError_1.CustomError {
    constructor() {
        super(409, "You can't be friends with yourself");
    }
}
exports.InvalidToBeYourFriend = InvalidToBeYourFriend;
class InvalidBeFriendsAgain extends CustomError_1.CustomError {
    constructor() {
        super(409, "You are already a friend of the user");
    }
}
exports.InvalidBeFriendsAgain = InvalidBeFriendsAgain;
class InvalidMakeFriendship extends CustomError_1.CustomError {
    constructor() {
        super(401, "Invalid the MakeFriendship.");
    }
}
exports.InvalidMakeFriendship = InvalidMakeFriendship;
class FriendNotFound extends CustomError_1.CustomError {
    constructor() {
        super(401, "Friend not Found.");
    }
}
exports.FriendNotFound = FriendNotFound;
