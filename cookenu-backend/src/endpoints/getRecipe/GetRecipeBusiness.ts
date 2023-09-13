import { RecipeNotFound } from "../../error/CustomErrorRecipes";
import { InvalidToken } from "../../error/CustomErrorToken";
import { TokenGenerator } from "../../services/TokenGenerator";
import { GetRecipeDatabase } from "./GetRecipeDatabase";

export class GetRecipeBusiness {
  constructor(
    private readonly getRecipeDatabase: GetRecipeDatabase,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public getRecipe = async (id: string, token: string) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      if (!userId) {
        throw new InvalidToken();
      }

      const result = await this.getRecipeDatabase.getRecipe(id);

      if (!result) {
        throw new RecipeNotFound();
      }

      return result;
    } catch (error: any) {
      throw new Error("Error getting recipe: " + error.message);
    }
  };
}
