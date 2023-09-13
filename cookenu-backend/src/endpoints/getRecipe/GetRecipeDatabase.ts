import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";

export class GetRecipeDatabase extends BaseDatabase {

    private static TABLE_NAME = "recipes_table";

    public getRecipe = async (recipeId: string): Promise<any> => {
        try {
          const searchResult = await GetRecipeDatabase.connection.queryBuilder()
            .select("*")
            .from("recipes_table")
            .where('id', recipeId);
    
            if (searchResult.length === 0) {
              return null;
            }
      
          const recipeResult = {
            title: searchResult[0].title,
            description: searchResult[0].description,
            deadline: searchResult[0].deadline,
            authorId: searchResult[0].author_id,
          };
          return recipeResult;
        }  catch (error: any) {
          throw new CustomError(400, error.message);
          
        }
      };
    }
