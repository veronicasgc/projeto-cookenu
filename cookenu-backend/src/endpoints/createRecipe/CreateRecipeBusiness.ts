import { CustomError } from "../../error/CustomError";
import { RecipeNotCreated } from "../../error/CustomErrorRecipes";
import { InvalidToken } from "../../error/CustomErrorToken";
import { RecipeInputDTO, Recipe } from "../../models/Recipe";
import { IdGenerator } from "../../services/IdGenerator";
import { TokenGenerator } from "../../services/TokenGenerator";
import { CreateRecipeDatabase } from "./CreateRecipeDatabase";

export class CreateRecipeBusiness {
    constructor(
      private readonly createRecipeDatabase: CreateRecipeDatabase,
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
            throw new RecipeNotCreated();
          }
          
          await this.createRecipeDatabase.createRecipe(
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
      };}