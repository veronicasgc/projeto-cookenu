import {Request, Response} from 'express'
import { EditRecipeBusiness } from './EditRecipeBusiness';

export class EditRecipeController{
    constructor(
        private readonly editRecipeBusiness: EditRecipeBusiness
      ) {}

    public editRecipe = async (req: Request, res: Response) => {
    try {
      const recipeId = req.params.recipeId;
      const{newTitle, newDescription} = req.body
      const token = req.headers.authorization as string
  
         
     await this.editRecipeBusiness.editRecipe(recipeId, newTitle, newDescription, token)
     res.status(200).send('Recipe updated successfully.');
    } catch (error) {
    
      res.status(400).send(error);
    }
  }
}