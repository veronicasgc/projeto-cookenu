import { CustomError } from "../../error/CustomError";
import { InvalidEmail, InvalidPassword, UserNotFound } from "../../error/CustomErrorUser";
import { MissingFieldsToComplete } from "../../error/MissingFieldsComplete";
import { LoginInputDTO } from "../../models/User";
import { HashManager } from "../../services/HashManager";
import { TokenGenerator } from "../../services/TokenGenerator";
import { LoginUserDatabase } from "./LoginUserDatabase";

export class LoginUserBusiness {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly hashManager: HashManager,
    private readonly loginUserDatabase: LoginUserDatabase
  ) {}

  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      const { email, password } = input;
    

      if (!email || !password) {
        throw new MissingFieldsToComplete();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const user = await this.loginUserDatabase.findUser(email);
   

      if (!user) {
        throw new UserNotFound();
      }

      let isValidPassword: boolean = false;

      if (user.isGeneratedPassword && password === user.password) {
        isValidPassword = true;
      } else {
        isValidPassword = await this.hashManager.compare(
          password,
          user.password
        );
      }
      
      if (!isValidPassword) {
        throw new InvalidPassword();
      }

      const token = this.tokenGenerator.generateToken(user.id, user.role);

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
