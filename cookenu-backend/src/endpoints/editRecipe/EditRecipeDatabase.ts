import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";

export class EditRecipeDatabase extends BaseDatabase {
    
    private static TABLE_NAME = "recipes_table";

public updateRecipe = async(recipeId: string,newTitle: string,newDescription: string,newDeadline: Date) => {
    try {
      await EditRecipeDatabase.connection(EditRecipeDatabase.TABLE_NAME)
      .where({id: recipeId})
      .update({
        title: newTitle,
        description:newDescription,
        deadline:newDeadline
      })
      .into(EditRecipeDatabase.TABLE_NAME)
    } catch (error: any) {
   
      throw new CustomError(400, error.message);
      
    }
  }
}