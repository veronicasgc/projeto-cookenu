import { CustomError } from "../error/CustomError";
import { Friend, FriendInputDTO, FriendInsert } from "../models/Friend";
import { BaseDatabase } from "./BaseDatabase";

export class FriendshipsDatabase extends BaseDatabase{

    private static TABLE_NAME = "friendships";

    public beFriend = async (friend: Friend) => {
        try {
            await FriendshipsDatabase.connection.queryBuilder()
            .insert({
                id: friend.id,
                user_id_1: friend.userId1,
                user_id_2: friend.userId2,
              status: 'PENDING',
        }).into(FriendshipsDatabase.TABLE_NAME)
        } catch (error: any) {
            throw new CustomError(400, error.message);
    } 
}
public getFriendshipByUsers = async (friend: FriendInputDTO): Promise<Friend | null> => {
    try {
   
      const result = await FriendshipsDatabase.connection.queryBuilder()
        .select()
        .from(FriendshipsDatabase.TABLE_NAME)
        .where(function () {
          this.where({ user_id_1: friend.userId1, 
            user_id_2: friend.userId2 
        }).orWhere({ user_id_1: friend.userId2,
             user_id_2: friend.userId1 
            });
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
  
public updateFriendshipStatus = async (friendshipId: string, status: string): Promise<void> => {
    try {
    
      await FriendshipsDatabase.connection.queryBuilder()
        .update({ status })
        .where({ id: friendshipId })
        .into(FriendshipsDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getFeedFriends = async  (userId1: string) => {
    try {
         const friendsRecipes = await FriendshipsDatabase.connection
        .select(  "recipes_table.id as id",
        "recipes_table.title as title",
        "recipes_table.description as description",
        "recipes_table.deadline as deadline",
        "recipes_table.author_id as userId",
        "cookenu_users.name as userName"
        )
        .from("friendships")

        .innerJoin("cookenu_users", "friendships.user_id_2","cookenu_users.id")

        .innerJoin("recipes_table", "friendships.user_id_2","recipes_table.author_id")

        .where({
          "friendships.user_id_1": userId1,
          "friendships.status": "ACCEPTED"})

        .orderBy("recipes_table.deadline", "asc")

        .into(FriendshipsDatabase.TABLE_NAME)

        return friendsRecipes

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
}

 
}