import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipesBusiness";
import { Recipe, RecipeInputDTO } from "../models/Recipe";
import { IdGenerator } from "../services/IdGenerator";
import { RecipeDatabase } from "../data/RecipesDatabase";
import { TokenGenerator } from "../services/TokenGenerator";

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

      const id = req.params.id as string;

      if (!id) {
        res.status(404).send({ message: "Recipe not found!" });
      }
      const recipeBusiness = new RecipeBusiness(
        new RecipeDatabase,
        new IdGenerator,
        new TokenGenerator
      );
    
    const result = await recipeBusiness.getRecipe(
           id ,req.headers.authorization as string
      );


      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error);
    }
  };



}
