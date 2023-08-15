import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipesBusiness";
import { Recipe, RecipeInputDTO } from "../models/Recipe";
import { IdGenerator } from "../services/IdGenerator";
import { RecipeDatabase } from "../data/RecipesDatabase";
import { TokenGenerator } from "../services/TokenGenerator";
import { CustomError } from "../error/CustomError";

export class RecipesController {
  public createRecipeController = async (req: Request, res: Response) => {
    try {
      const input: RecipeInputDTO = {
        title: req.body.title,
        description: req.body.description,
      };

      const recipeBusiness = new RecipeBusiness(
        new RecipeDatabase,
        new IdGenerator,
        new TokenGenerator
      );

      await recipeBusiness.createRecipe(
        input,
        req.headers.authorization as string
      );

      res.status(201).send({ message: "Receita criada com sucesso!" });
    } catch (error) {
      res.status(400).send(error);
    }
  };

  public getRecipe = async (req: Request, res: Response) => {
    try {

      const { recipeId } = req.params;

      if (!recipeId) {
        res.status(404).send({ message: 'Recipe not found!' });
        return;
      }
      const token = req.headers.authorization as string
    
      if (!token) {
        res.status(401).send({ message: "Invalid token!" });
        return;
      }
      
      const recipeBusiness = new RecipeBusiness(
        new RecipeDatabase,
        new IdGenerator,
        new TokenGenerator
      );
    
      const result = await recipeBusiness.getRecipe(recipeId, token);

      if (!result) {
        res.status(404).send({ message: 'Recipe not found!' });
        return;
      }

      res.status(200).send(result);

    } catch (error: any) {
      res.status(400).send({ error: error.message });
    }
  };

public editRecipe = async (req: Request, res: Response) => {
  try {
    const recipeId = req.params.recipeId;
   

    const{newTitle, newDescription} = req.body
    
    const recipeBusiness = new RecipeBusiness(
      new RecipeDatabase,
      new IdGenerator,
      new TokenGenerator
    )
    const token = req.headers.authorization as string
   

await recipeBusiness.editRecipe(recipeId, newTitle, newDescription, token)
    
  } catch (error) {
    res.status(400).send(error);
  }
}

}
