"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidMakeFriendship = exports.invalidBeFriendsAgain = exports.invalidYouBeYourFriend = void 0;
const CustomError_1 = require("./CustomError");
class invalidYouBeYourFriend extends CustomError_1.CustomError {
    constructor() {
        super(409, "You can't be friends with yourself");
    }
}
exports.invalidYouBeYourFriend = invalidYouBeYourFriend;
class invalidBeFriendsAgain extends CustomError_1.CustomError {
    constructor() {
        super(409, "You are already a friend of the user");
    }
}
exports.invalidBeFriendsAgain = invalidBeFriendsAgain;
class invalidMakeFriendship extends CustomError_1.CustomError {
    constructor() {
        super(401, "invalid the MakeFriendship is required to pass the query.");
    }
}
exports.invalidMakeFriendship = invalidMakeFriendship;
