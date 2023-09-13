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
exports.UnfollowFriendController = void 0;
const CustomErrorToken_1 = require("../../error/CustomErrorToken");
class UnfollowFriendController {
    constructor(unfollowFriendBusiness) {
        this.unfollowFriendBusiness = unfollowFriendBusiness;
        this.unfollowFriend = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId2 } = req.body;
                const token = req.headers.authorization;
                if (!token) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                const friendInsert = {
                    userId1: '',
                    userId2,
                };
                yield this.unfollowFriendBusiness.unfollowFriend(friendInsert, token);
                res.status(200).send({ message: 'Unfollowed successfully' });
            }
            catch (error) {
                res.status(400).send({ error: 'Failed to follow user.' });
            }
        });
    }
}
exports.UnfollowFriendController = UnfollowFriendController;
