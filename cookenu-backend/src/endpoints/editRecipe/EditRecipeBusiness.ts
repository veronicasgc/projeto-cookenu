import { CustomError } from "../../error/CustomError";
import { TokenGenerator } from "../../services/TokenGenerator";
import { GetRecipeDatabase } from "../getRecipe/GetRecipeDatabase";
import { EditRecipeDatabase } from "../editRecipe/EditRecipeDatabase";
import {
  RecipeNotFound,
  UnableToEditRecipe,
} from "../../error/CustomErrorRecipes";

export class EditRecipeBusiness {
  constructor(
    private readonly getRecipeDatabase: GetRecipeDatabase,
    private readonly editRecipeDatabase: EditRecipeDatabase,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public editRecipe = async (
    recipeId: string,
    newTitle: string,
    newDescription: string,
    token: string
  ) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      const recipe = await this.getRecipeDatabase.getRecipe(recipeId);

      if (!recipe) {
        throw new RecipeNotFound();
      }

      if (recipe.authorId !== userId) {
        throw new UnableToEditRecipe();
      }

      const newDeadline = new Date();

      await this.editRecipeDatabase.updateRecipe(
        recipeId,
        newTitle,
        newDescription,
        newDeadline
      );
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
