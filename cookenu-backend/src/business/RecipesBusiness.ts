import { RecipeDatabase } from "../data/RecipesDatabase";
import { Recipe, RecipeInputDTO } from "../models/Recipe";
import { RecipeNotCreated, CustomError } from "../error/CustomError";
import { IdGenerator } from "../services/IdGenerator";

export class RecipeBusiness {
  constructor(
    private readonly recipeDatabase: RecipeDatabase
  ){}

  public createRecipe = async (input: RecipeInputDTO) => {
    try {
      const { title, description, deadline } = input;

      if (!title || !description || !deadline) {
        throw new RecipeNotCreated();
      }
      const idGenerator = new IdGenerator();
      const id = idGenerator.generateId();
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getRecipeById = async (id: string) => {
    try {
     
      const recipesDatabase = await this.recipeDatabase.getRecipeById(id);
    const result = await recipesDatabase.getRecipeById(id);
    return result;
    } catch (error) {
      
    }
  };
  
}
