import { Request, Response } from "express";
import { RecipeBusiness } from "../business/RecipesBusiness";
import { Recipe, RecipeInputDTO } from "../models/Recipe";
import { IdGeneratorInterface } from "../services/IdGenerator";

export class RecipesController {
  constructor(private readonly recipeBusiness: RecipeBusiness,
     private readonly idGenerator: IdGeneratorInterface) {}

  public createRecipeController = async (req: Request, res: Response): Promise<void> => {
    try {
     
      const token = req.headers.authorization || "";
      const { title, description } = req.body;
    
      const recipe: Recipe = {
        id: this.idGenerator.generateId(), 
        title,
        description,
        deadline: new Date(),
        authorId: ""
      };

      await this.recipeBusiness.createRecipe(token, recipe);

      res.status(201).send({ message: "Receita adicionada com sucesso!" });
    } catch (error) {
        res.status(400).send(error);
    }
  };

  public getRecipeById = async (req: Request, res: Response) => {
    try {
        const title = req.query.title as string;
     
        if(!title){
          res.status(404).send({ message: "Recipe not found!" });
        }
        const result = await this.recipeBusiness.getRecipeById(title)

        res.status(200).send(result);        
    } catch (error) {
      res.status(400).send(error);
    }
  }
}
