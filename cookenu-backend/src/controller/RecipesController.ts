import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipesBusiness";
import { RecipeInputDTO } from "../models/Recipe";

export class RecipesController {
  constructor(private readonly recipeBusiness: RecipeBusiness) {}
  public createRecipeController = async (req: Request, res: Response) => {
    try {
        const {title, description, deadline} = req.body;

        const input: RecipeInputDTO = {
            title,
            description,
            deadline
        }
        const token = await this.recipeBusiness.createRecipe(input);

        res.status(201).send({ message: "Receita adicionada com sucesso!", token});
    } catch (error) {
        res.status(400).send(error);
    }
  };

  public getRecipeById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const recipeBusiness = await this.recipeBusiness.getRecipeById(id)

        
    } catch (error) {
        
    }
  }
}
