import { CustomError } from "../../error/CustomError";
import { FriendNotFound, InvalidToBeYourFriend } from "../../error/CustomErrorFriend";
import { InvalidToken } from "../../error/CustomErrorToken";
import { FriendInsert, Friend } from "../../models/Friend";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenGenerator } from "../../services/TokenGenerator";
import { UnfollowFriendDatabase } from "./UnfollowFriendDatadabase";

export class UnfollowFriendBusiness {
  constructor(
    private readonly unfollowFriendDatabase: UnfollowFriendDatabase,
    private readonly idGenerator: IdGenerator,
    private readonly tokenGenerator: TokenGenerator
  ) {}
  
  public unfollowFriend = async (
    input: FriendInsert,
    token: string
  ): Promise<void> => {
    try {
      if (!input.userId2 || input.userId2.trim() === "") {
        throw new FriendNotFound();
      }

      const authenticatorData = this.tokenGenerator.tokenData(token);

      if (!token) {
        throw new InvalidToken();
      }

      const userId1 = authenticatorData.id;

      if (userId1 === input.userId2) {
        throw new InvalidToBeYourFriend();
      }

      const existingRequest =
        await this.unfollowFriendDatabase.getFriendshipByUsers({
          userId1,
          userId2: input.userId2,
        });

      if (existingRequest && existingRequest.status === "ACCEPTED") {
        await this.unfollowFriendDatabase.updateFriendshipStatus(
          existingRequest.id,
          "PENDING"
        );
      } else {
        const friend: Friend = {
          id: this.idGenerator.generateId(),
          userId1,
          userId2: input.userId2,
          status: "PENDING",
        };
        await this.unfollowFriendDatabase.beFriend(friend);
      }
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
