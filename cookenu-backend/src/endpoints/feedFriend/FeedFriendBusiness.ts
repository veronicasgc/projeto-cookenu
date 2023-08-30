import { CustomError } from "../../error/CustomError";
import { InvalidToken } from "../../error/CustomErrorToken";
import { TokenGenerator } from "../../services/TokenGenerator";
import { FeedFriendDatabase } from "./FeedFriendDatabase";

export class FeedFriendBusiness {
  constructor(
    private readonly feedFriendDatabase: FeedFriendDatabase,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public getFeedFriends = async (token: string) => {
    try {
      if (!token) {
        throw new InvalidToken();
      }

      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId1 = authenticatorData.id;

      const result = await this.feedFriendDatabase.getFeedFriends(userId1);

      const recipes = result.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        deadline: recipe.deadline,
        userId: recipe.userId,
        userName: recipe.userName,
      }));

      return { recipes };
    } catch (error: any) {
      throw new CustomError(error.statusCode || 500, error.message);
    }
  };
}
