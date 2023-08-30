import {Request, Response} from 'express'
import { RecipeInputDTO } from '../../models/Recipe';
import { CreateRecipeBusiness } from './CreateRecipeBusiness';


export class CreateRecipeController{
    constructor(
        private readonly createRecipeBusiness: CreateRecipeBusiness
      ) {}
    public createRecipeController = async (req: Request, res: Response) => {
        try {
          const input: RecipeInputDTO = {
            title: req.body.title,
            description: req.body.description,
          };
    
       
          await this.createRecipeBusiness.createRecipe(
            input,
            req.headers.authorization as string
          );
    
          res.status(201).send({ message: "Receita criada com sucesso!" });
        } catch (error) {
          res.status(400).send(error);
        }
      };
}
