import { RecipeDatabase } from "../data/RecipesDatabase";
import { Recipe, RecipeInputDTO } from "../models/Recipe";
import { RecipeNotCreated, CustomError } from "../error/CustomError";
import { IdGeneratorInterface } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";
import { AuthenticationData } from "../models/User";


export class RecipeBusiness {
  constructor(
    private readonly recipeDatabase: RecipeDatabase,
    private readonly idGenerator: IdGeneratorInterface,
    private readonly tokenGenerator: TokenGenerator
   
  ){}



  public createRecipe = async (token: string, recipe: Recipe): Promise<void>  => {
    try {

        // Verificar se o token está presente e no formato correto
        if (!token || !token.startsWith("Bearer ")) {
          throw new Error("Token de autorização ausente ou formato inválido");
        }
  
        // Extrair o token sem o prefixo "Bearer "
        const tokenWithoutPrefix = token.slice(7);
  
        // Validar e extrair os dados do token
        const tokenData = this.tokenGenerator.tokenData(tokenWithoutPrefix);
  
        // Verificar se o usuário está logado
        if (!tokenData.id) {
          throw new Error("Usuário não autenticado");
        }
  
        // Definir a data atual para a propriedade "deadline" do objeto "recipe"
        recipe.deadline = new Date();

  
        // Atribuir o ID do usuário logado para a propriedade "author_id" do objeto "recipe"
        recipe.authorId = tokenData.id;
  
       
    
     
             
      const result = await this.recipeDatabase.createRecipe(recipe);
      return result
     
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getRecipeById = async (title: string) => {
    try {
      const result = await this.recipeDatabase.getRecipeById(title);
    return result;
    } catch (error:any) {
      throw new CustomError(400, error.message); ;
    }
  };
  
}
