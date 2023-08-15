import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { EditUserInputDTO, LoginInputDTO, UserInputDTO } from "../models/User";

export class UserController {
  constructor(private readonly userBusiness: UserBusiness) {}

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

      const input: LoginInputDTO = {
        email,
        password,
      };
      const token = await this.userBusiness.login(input);

      res.status(200).send({ message: "Usuário logado!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };

//pegar todos usuários existentes
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

    const result=  await this.userBusiness.getUser(token);

      res.status(201).send(result)
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
