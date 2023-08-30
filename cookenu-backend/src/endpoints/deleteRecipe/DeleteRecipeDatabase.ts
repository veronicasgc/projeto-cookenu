import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";

export class DeleteRecipeDatabase extends BaseDatabase {
  private static TABLE_NAME = "recipes_table";

  public deleteRecipe = async (recipeId: string): Promise<any> => {
    try {
      await DeleteRecipeDatabase.connection(DeleteRecipeDatabase.TABLE_NAME)
        .where({ id: recipeId })
        .delete();
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
