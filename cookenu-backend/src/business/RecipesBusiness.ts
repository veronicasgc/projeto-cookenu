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

  public getRecipe = async (id: string, token: string ) => {
    try {

      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      if(!userId){
        throw new InvalidToken()
      }
         
      const result = await this.recipeDatabase.getRecipe(id);

      if (!result) {
        throw new Error('Recipe not found.');
      }

      return result;
      
    } catch (error: any) {
      throw new Error('Error getting recipe: ' + error.message);
    }
  };

  public editRecipe = async(recipeId: string,newTitle: string,newDescription: string, token: string)=> {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      const recipe = await this.recipeDatabase.getRecipe(recipeId)

      if (!recipe) {
    
        throw new Error('Recipe not found.');
      }

      if (recipe.authorId !== userId) {
        console.log('You do not have permission to edit this recipe.');
        throw new Error('You do not have permission to edit this recipe.');
      }

      const newDeadline = new Date()

      await this.recipeDatabase.updateRecipe(recipeId, newTitle, newDescription, newDeadline);

    }catch (error: any) {
      console.log('Error in editRecipe:', error.message);
      throw new Error('Unable to edit recipe.');
      // throw new CustomError(400, error.message)
    }
  }

  public deleteRecipe = async (recipeId: string, token: string) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      const recipe = await this.recipeDatabase.getRecipe(recipeId)

      if (!recipe) {
        throw new Error('Recipe not found.');
      }

      if (recipe.authorId !== userId && authenticatorData.role !== 'ADMIN') {
        console.log('You do not have permission to delete this recipe.');
        throw new Error('You do not have permission to delete this recipe.');
      }
await this.recipeDatabase.deleteRecipe(recipeId)
    } catch (error: any) {
      console.log('Error in deleteRecipe:', error.message);
      throw new Error('Unable to delete recipe.');
    }
  }


}
