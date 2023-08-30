import { TokenGenerator } from "../../services/TokenGenerator";
import { GetRecipeDatabase } from "../getRecipe/GetRecipeDatabase";
import { DeleteRecipeDatabase } from "./DeleteRecipeDatabase";

export class DeleteRecipeBusiness {
  constructor(
    private readonly deleteRecipeDatabase: DeleteRecipeDatabase,
    private readonly tokenGenerator: TokenGenerator,
    private readonly getRecipeDatabase: GetRecipeDatabase
  ) {}

  public deleteRecipe = async (recipeId: string, token: string) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      const recipe = await this.getRecipeDatabase.getRecipe(recipeId);

      if (!recipe) {
        throw new Error("Recipe not found.");
      }

      if (recipe.authorId !== userId && authenticatorData.role !== "ADMIN") {
        console.log("You do not have permission to delete this recipe.");
        throw new Error("You do not have permission to delete this recipe.");
      }
      await this.deleteRecipeDatabase.deleteRecipe(recipeId);
    } catch (error: any) {
      console.log("Error in deleteRecipe:", error.message);
      throw new Error("Unable to delete recipe.");
    }
  };
}
