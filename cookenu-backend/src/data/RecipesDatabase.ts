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

  public getRecipe = async (recipeId: string): Promise<any> => {
    try {
      const searchResult = await RecipeDatabase.connection.queryBuilder()
        .select("*")
        .from("recipes_table")
        .where('id', recipeId);

        if (searchResult.length === 0) {
          return null; // Retorna null quando a receita não é encontrada
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

  public updateRecipe = async(recipeId: string,newTitle: string,newDescription: string,newDeadline: Date) => {
    try {
      await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
      .where({id: recipeId})
      .update({
        title: newTitle,
        description:newDescription,
        deadline:newDeadline
      })
      .into(RecipeDatabase.TABLE_NAME)
    } catch (error: any) {
      throw new Error('Unable to update recipe.');
      // throw new CustomError(400, error.message);
      
    }
  }

  public deleteRecipe = async(recipeId: string): Promise<any> => {
    try {
      await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
      .where({id: recipeId})
      .delete()
     
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
