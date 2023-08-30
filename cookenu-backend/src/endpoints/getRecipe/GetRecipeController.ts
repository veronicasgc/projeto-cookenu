import {Request, Response} from 'express'
import { GetRecipeBusiness } from "./GetRecipeBusiness";

export class GetRecipeController{
    constructor(
        private readonly getRecipeBusiness: GetRecipeBusiness
      ) {}
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
      
        
          const result = await this.getRecipeBusiness.getRecipe(recipeId, token);
    
          if (!result) {
            res.status(404).send({ message: 'Recipe not found!' });
            return;
          }
    
          res.status(200).send(result);
    
        } catch (error: any) {
          res.status(400).send({ error: error.message });
        }
      };
    
}