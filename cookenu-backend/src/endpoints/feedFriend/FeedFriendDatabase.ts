import { CustomError } from "../../error/CustomError";
import { BaseDatabase } from "../../data/BaseDatabase";

export class FeedFriendDatabase extends BaseDatabase {
  private static TABLE_NAME = "friendships";

  public getFeedFriends = async (userId1: string) => {
    try {
      
      const friendsRecipes = await FeedFriendDatabase.connection
        .select(
          "recipes_table.id as id",
          "recipes_table.title as title",
          "recipes_table.description as description",
          "recipes_table.deadline as deadline",
          "recipes_table.author_id as userId",
          "cookenu_users.name as userName"
        )
        .from("friendships")

        .innerJoin("cookenu_users", "friendships.user_id_2", "cookenu_users.id")

        .innerJoin(
          "recipes_table",
          "friendships.user_id_2",
          "recipes_table.author_id"
        )

        .where({
          "friendships.user_id_1": userId1,
          "friendships.status": "ACCEPTED",
        })

        .orderBy("recipes_table.deadline", "asc")

        .into(FeedFriendDatabase.TABLE_NAME);

       
        
      return friendsRecipes;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
