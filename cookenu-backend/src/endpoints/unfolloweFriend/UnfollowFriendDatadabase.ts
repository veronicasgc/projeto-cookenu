import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";
import { Friend, FriendInputDTO } from "../../models/Friend";

export class UnfollowFriendDatabase extends BaseDatabase {
  private static TABLE_NAME = "friendships";

  public beFriend = async (friend: Friend) => {
    try {
      await UnfollowFriendDatabase.connection
        .queryBuilder()
        .insert({
          id: friend.id,
          user_id_1: friend.userId1,
          user_id_2: friend.userId2,
          status: "PENDING",
        })
        .into(UnfollowFriendDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getFriendshipByUsers = async (
    friend: FriendInputDTO
  ): Promise<Friend | null> => {
    try {
      const result = await UnfollowFriendDatabase.connection
        .queryBuilder()
        .select()
        .from(UnfollowFriendDatabase.TABLE_NAME)
        .where(function () {
          this.where({
            user_id_1: friend.userId1,
            user_id_2: friend.userId2,
          }).orWhere({ user_id_1: friend.userId2, user_id_2: friend.userId1 });
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
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public updateFriendshipStatus = async (
    friendshipId: string,
    status: string
  ): Promise<void> => {
    try {
      await UnfollowFriendDatabase.connection
        .queryBuilder()
        .update({ status })
        .where({ id: friendshipId })
        .into(UnfollowFriendDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
