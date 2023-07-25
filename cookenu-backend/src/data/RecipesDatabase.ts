import { CustomError } from "../error/CustomError";
import { Recipe } from "../models/Recipe";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  private static TABLE_NAME = "recipes_table";

  public createRecipe = async (recipe: Recipe): Promise<void> => {
    try {
      await RecipeDatabase.connection.queryBuilder()
        .insert({
          id: recipe.getId(),
          title: recipe.getTitle(),
          description: recipe.getDescription(),
          deadline: recipe.getDeadline(),
          author_id: recipe.getAuthorId(),
        })
        .into(RecipeDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getRecipe = async (id: string) => {
    const searchResult = await RecipeDatabase.connection(
      RecipeDatabase.TABLE_NAME
    )
      .select("*")
      .where({ id });

    const recipeResult = {
      title: searchResult[0].title,
      description: searchResult[0].description,
      deadline: searchResult[0].deadline,
      authorId: searchResult[0].author_id,
    };
    return recipeResult;
  };


}
