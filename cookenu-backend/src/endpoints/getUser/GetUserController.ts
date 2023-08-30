import { Request, Response } from "express";
import { GetUserBusiness } from "./GetUserBusiness";
import { GetUserDatabase } from "./GetUserDatabase";

export class GetUserController{
    constructor(
        private readonly getUserBusiness: GetUserBusiness,
        private readonly createUserDatabase: GetUserDatabase
      ) {}
    
    public allUsers = async (req: Request, res: Response) => {
        try {
          
        const result=  await this.getUserBusiness.allUsers();
      
          res.status(201).send(result)
        } catch (error: any) {
          res.status(400).send(error.message);
        }
      };
      
      
        public getUser = async (req: Request, res: Response) => {
          try {
            const token = req.headers.token as string
            const userId = req.params.userId as string
      
          const result=  await this.getUserBusiness.getUser(userId, token);
      
            res.status(201).send(result)
          } catch (error: any) {
            res.status(400).send(error.message);
          }
        };
}
