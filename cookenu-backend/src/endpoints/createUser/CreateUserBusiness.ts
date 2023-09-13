import { CustomError } from "../../error/CustomError";
import {
  InvalidName,
  InvalidPassword,
  InvalidEmail,
  InvalidRole,
  InvalidPasswordCharacters,
} from "../../error/CustomErrorUser";
import { MissingFieldsToComplete } from "../../error/MissingFieldsComplete";
import { UserInputDTO, UserRole, user } from "../../models/User";
import { HashManager } from "../../services/HashManager";
import { IdGeneratorInterface } from "../../services/IdGenerator";
import { TokenGenerator } from "../../services/TokenGenerator";
import { CreateUserDatabase } from "./CreateUserDatabase";

export class CreateUserBusiness {
  constructor(
    private readonly idGenerator: IdGeneratorInterface,
    private readonly tokenGenerator: TokenGenerator,
    private readonly hashManager: HashManager,
    private readonly createUserDatabase: CreateUserDatabase
  ) {}

  public createUser = async (input: UserInputDTO): Promise<string> => {
    try {
      const { name, email, password } = input;
      let role = input.role;

      if (!name || !email || !password || !role) {
        throw new MissingFieldsToComplete()
      }

      if (name.length < 4) {
        throw new InvalidName();
      }

      if (password.length < 6) {
        throw new InvalidPasswordCharacters();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      if (role !== "NORMAL" && role !== "ADMIN") {
        throw new InvalidRole();
      }

      if (role !== "NORMAL" && role !== "ADMIN") {
        role = "NORMAL";
      }

      const id: string = this.idGenerator.generateId();

      const hashPassword: string = await this.hashManager.hash(password);

      const newUser: user = {
        id,
        name,
        email,
        password: hashPassword,
        role: UserRole[role as keyof typeof UserRole],
      };

      if (newUser.email === email) {
        throw new CustomError(400,'Email já cadastrado!');;
      }

      await this.createUserDatabase.insertUser(newUser);
      const token = this.tokenGenerator.generateToken(id, newUser.role);

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
