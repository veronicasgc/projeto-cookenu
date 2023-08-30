import { CustomError } from "../../error/CustomError";
import { invalidYouBeYourFriend } from "../../error/CustomErrorFriend";
import { FriendInsert, Friend } from "../../models/Friend";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenGenerator } from "../../services/TokenGenerator";
import { MakeFriendshipDatabase } from "./MakeFriendshipDatabase";

export class MakeFriendshipBusiness {
  constructor(
    private readonly makeFriendshipDatabase: MakeFriendshipDatabase,
    private readonly idGenerator: IdGenerator,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public beFriend = async (
    input: FriendInsert,
    token: string
  ): Promise<void> => {
    try {
      if (!input.userId2 || input.userId2.trim() === "") {
        throw new Error("Invalid userToFollowId.");
      }

      const authenticatorData = this.tokenGenerator.tokenData(token);
      const userId1 = authenticatorData.id;

      if (userId1 === input.userId2) {
        throw new invalidYouBeYourFriend();
      }

      const existingRequest =
        await this.makeFriendshipDatabase.getFriendshipByUsers({
          userId1,
          userId2: input.userId2,
        });

      if (existingRequest && existingRequest.status === "PENDING") {
        await this.makeFriendshipDatabase.updateFriendshipStatus(
          existingRequest.id,
          "ACCEPTED"
        );
      } else {
        const friend: Friend = {
          id: this.idGenerator.generateId(),
          userId1,
          userId2: input.userId2,
          status: "PENDING",
        };
        await this.makeFriendshipDatabase.beFriend(friend);
      }
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
