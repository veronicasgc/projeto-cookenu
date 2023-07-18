import { CustomError } from "../error/CustomError";
import { Recipe } from "../models/Recipe";
import { TokenGenerator } from "../services/TokenGenerator";
import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
  generateId() {
    throw new Error("Method not implemented.");
  }
  private static TABLE_NAME = "Recipes_table";

  public createRecipe = async (
    recipe: Recipe) => {
    try {
      await RecipeDatabase.connection.queryBuilder()
      .insert(recipe)
      .into(RecipeDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getRecipeById = async (title: string) => {
    const searchResult = await RecipeDatabase.connection(
      RecipeDatabase.TABLE_NAME
    )
      .select("*")
      .where({ title });

    const recipeResult = {
      title: searchResult[0].title,
      description: searchResult[0].description,
      deadline: searchResult[0].deadline,
      authorId: searchResult[0].author_id,
    };
    return recipeResult;
  };
}
