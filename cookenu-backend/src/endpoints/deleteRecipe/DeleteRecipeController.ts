import {Request, Response} from 'express'
import { DeleteRecipeBusiness } from './DeleteRecipeBusiness';

export class DeleteRecipeController {
    constructor(
        private readonly deleteRecipeBusiness: DeleteRecipeBusiness
      ) {}
    public deleteRecipe = async (req: Request, res: Response) => {
      try {
        const recipeId = req.params.recipeId;
        const token = req.headers.authorization as string
    
        await this.deleteRecipeBusiness.deleteRecipe(recipeId, token)
        res.status(200).send('Recipe deteled successfully.')
      } catch (error) {
        res.status(400).send(error);
      }
    }
    }
    