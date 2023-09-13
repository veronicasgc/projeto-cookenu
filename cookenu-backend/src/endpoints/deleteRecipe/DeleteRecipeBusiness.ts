import { CustomError } from "../../error/CustomError";
import { RecipeNotFound, UnableToDeleteRecipe } from "../../error/CustomErrorRecipes";
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
      console.log("Deleting recipe. Recipe ID:", recipeId, "Token:", token);
    
      const authenticatorData = this.tokenGenerator.tokenData(token);
      console.log("Authenticator Data:", authenticatorData);

      const userId = authenticatorData.id;
      console.log("User ID:", userId);

      const recipe = await this.getRecipeDatabase.getRecipe(recipeId);
      console.log("Recipe:", recipe);

      if (!recipe) {
        throw new RecipeNotFound();
      }
      console.log("Author ID:", recipe.authorId);

      if (recipe.authorId !== userId && authenticatorData.role !== "ADMIN") {
        console.log("Unable to delete recipe. Condition met.");
        throw new UnableToDeleteRecipe();
      }
      console.log("Deleting recipe...");

      await this.deleteRecipeDatabase.deleteRecipe(recipeId);
        console.log("Recipe deleted.");
    } catch (error: any) {
      console.error("Error:", error);
      throw new CustomError(400, error.message);
    }
  };
}
