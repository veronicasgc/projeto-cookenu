import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { EditUserInputDTO, LoginInputDTO, UserInputDTO } from "../models/User";
import { UserDatabase } from "../data/UserDatabase";

export class UserController {

  constructor(
    private readonly userBusiness: UserBusiness,
    private readonly userDatabase: UserDatabase
    ) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role} = req.body; //, role 

      const input: UserInputDTO = {
        name,
        email,
        password,
        role
      };

      const token = await this.userBusiness.createUser(input);

      res.status(201).send({ message: "Usuário criado!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      console.log("Login request:", req.body);

      const input: LoginInputDTO = {
        email,
        password,
      };
     const token = await this.userBusiness.login(input);
     console.log("Generated token:", token);

      let message = "Usuário logado!";
      let isGeneratedPassword = false;

      const user = await this.userDatabase.findUser(email);
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


public allUsers = async (req: Request, res: Response) => {
  try {
    
  const result=  await this.userBusiness.allUsers();

    res.status(201).send(result)
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};


  public getUser = async (req: Request, res: Response) => {
    try {
      const token = req.headers.token as string
      const userId = req.params.userId as string

    const result=  await this.userBusiness.getUser(userId, token);

      res.status(201).send(result)
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

  public deleteAccount = async (req: Request, res: Response)=>{
    try {
      const userId = req.params.userId;
    const token = req.headers.authorization as string

    await this.userBusiness.deleteAccount(userId, token)

    res.status(200).send('Account deteled successfully.')
  } catch (error) {
      console.log('Controller error:', error);
    res.status(400).send(error);
  }
  }

  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const email = req.body.email
   

  
      const newPassword = await this.userBusiness.forgotPassword(email)

      res.status(200).send(`Password reset successfully.Your new password is: ${newPassword}`);
      
    } catch (error: any) {
      res.status(400).send(error.message);
    }
 
  } 

}


