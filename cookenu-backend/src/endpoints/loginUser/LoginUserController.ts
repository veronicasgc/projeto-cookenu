import { Request, Response } from "express";
import { LoginInputDTO } from "../../models/User";
import { LoginUserBusiness } from "./LoginUserBusiness";
import { LoginUserDatabase } from "./LoginUserDatabase";

export class LoginUserController{
    constructor(
        private readonly loginUserBusiness: LoginUserBusiness,
        private readonly loginUserDatabase: LoginUserDatabase
      ) {}
    public login = async (req: Request, res: Response) => {
        try {
          const { email, password } = req.body;
          console.log("Login request:", req.body);
    
          const input: LoginInputDTO = {
            email,
            password,
          };
         const token = await this.loginUserBusiness.login(input);
         console.log("Generated token:", token);
    
          let message = "Usuário logado!";
          let isGeneratedPassword = false;
    
          const user = await this.loginUserDatabase.findUser(email);
          console.log("User in Controller:", user);
          
          if (user && password === user.generatedPassword) {
            message = "Usuário logado com senha gerada. Por favor, atualize sua senha.";
            isGeneratedPassword = true;
          }
          res.status(200).send({ message, token, isGeneratedPassword });
    
        } catch (error: any) {
          console.log("Controller error:", error);
          res.status(400).send(error.message);
        }
      };
    
    
}
