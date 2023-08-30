import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";
import { Recipe } from "../../models/Recipe";

export class CreateRecipeDatabase extends BaseDatabase {
    private static TABLE_NAME = "recipes_table";
    public createRecipe = async (recipe: Recipe): Promise<void> => {
        try {
          await CreateRecipeDatabase.connection.queryBuilder()
            .insert({
              id: recipe.getId(),
              title: recipe.getTitle(),
              description: recipe.getDescription(),
              deadline: recipe.getDeadline(),
              author_id: recipe.getAuthorId(),
            })
            .into(CreateRecipeDatabase.TABLE_NAME);
        } catch (error: any) {
          throw new CustomError(400, error.message);
        }
      };
    }    