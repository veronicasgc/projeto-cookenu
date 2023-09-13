import { UserInputDTO } from "../../models/User";
import { CreateUserBusiness } from "./CreateUserBusiness";
import { Request, Response } from "express";

export class CreateUserController {
  constructor(
    private readonly createUserBusiness: CreateUserBusiness,
   
  ) {}

  public signup = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;

      const input: UserInputDTO = {
        name,
        email,
        password,
        role,
      };

      const token = await this.createUserBusiness.createUser(input);

      res.status(201).send({ message: "User created!", token });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
