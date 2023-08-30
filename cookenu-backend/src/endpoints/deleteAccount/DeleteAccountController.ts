import { Request, Response } from "express";
import { DeleteAccountBusiness } from "./DeleteAccountBusiness";


export class DeleteAccountController {
    constructor(
        private readonly deleteAccountBusiness: DeleteAccountBusiness,
      
      ) {}

    public deleteAccount = async (req: Request, res: Response)=>{
        try {
          const userId = req.params.userId;
        const token = req.headers.authorization as string
    
        await this.deleteAccountBusiness.deleteAccount(userId, token)
    
        res.status(200).send('Account deteled successfully.')
      } catch (error) {
          console.log('Controller error:', error);
        res.status(400).send(error);
      }
      }
    
}