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

  public getFeedFriends = async  (sort: string, order: string):Promise<Friend[]> => {
    try {
         const friendsRecipes = await FriendshipsDatabase.connection
        .select("cookenu_users.name as Usuário","recipes_table.title", "recipes_table.description","recipes_table.deadline", "recipes_table.author_id")
        .from("friendships")
        .innerJoin("cookenu_users", "friendships.userid2","cookenu_users.id")
        .innerJoin("recipes_table", "friendships.userid2","recipes_table.author_id")
        .where({"friendships.status": "ACCEPTED"})
        .orderBy("recipes_table.deadline", "asc")
        .into(FriendshipsDatabase.TABLE_NAME)

        return friendsRecipes

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
}

 
}