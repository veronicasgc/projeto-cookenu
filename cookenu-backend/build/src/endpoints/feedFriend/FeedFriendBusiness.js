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
exports.FeedFriendBusiness = void 0;
const CustomError_1 = require("../../error/CustomError");
const CustomErrorRecipes_1 = require("../../error/CustomErrorRecipes");
const CustomErrorToken_1 = require("../../error/CustomErrorToken");
class FeedFriendBusiness {
    constructor(feedFriendDatabase, tokenGenerator) {
        this.feedFriendDatabase = feedFriendDatabase;
        this.tokenGenerator = tokenGenerator;
        this.getFeedFriends = (token) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!token) {
                    throw new CustomErrorToken_1.InvalidToken();
                }
                const authenticatorData = this.tokenGenerator.tokenData(token);
                const userId1 = authenticatorData.id;
                console.log("Authenticator Data:", authenticatorData);
                console.log("User ID:", userId1);
                const result = yield this.feedFriendDatabase.getFeedFriends(userId1);
                console.log("Result from database:", result);
                const recipes = result.map((recipe) => ({
                    id: recipe.id,
                    title: recipe.title,
                    description: recipe.description,
                    deadline: recipe.deadline,
                    userId: recipe.userId,
                    userName: recipe.userName,
                }));
                if (!recipes) {
                    throw new CustomErrorRecipes_1.RecipeNotFound();
                }
                console.log("Returning recipes:", recipes);
                return { recipes };
            }
            catch (error) {
                throw new CustomError_1.CustomError(error.statusCode || 500, error.message);
            }
        });
    }
}
exports.FeedFriendBusiness = FeedFriendBusiness;
