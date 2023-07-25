import { RecipeDatabase } from "../data/RecipesDatabase";
import { Recipe, RecipeInputDTO } from "../models/Recipe";
import { CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { MissingFieldsToComplete } from "../error/MissingFieldsComplete";
import { InvalidToken } from "../error/CustomErrorToken";

export class RecipeBusiness {
  constructor(
    private readonly recipeDatabase: RecipeDatabase,
    private readonly idGenerator: IdGenerator,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public createRecipe = async (input: RecipeInputDTO, token: string) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      if (!token) {
        throw new InvalidToken();
      }

      if (!input.title || !input.description) {
        throw new MissingFieldsToComplete();
      }
      
      await this.recipeDatabase.createRecipe(
        Recipe.toRecipe({
          ...input,
          id: this.idGenerator.generateId(),
          deadline: new Date(),
          authorId: authenticatorData.id,
        })
      );
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getRecipe = async (id: string, token: string) => {
    try {
      
      const result = await this.recipeDatabase.getRecipe(id);
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };


}
