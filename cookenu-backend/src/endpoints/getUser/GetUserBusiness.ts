import { CustomError } from "../../error/CustomError";
import { InvalidToken } from "../../error/CustomErrorToken";
import { UserNotFound } from "../../error/CustomErrorUser";
import { HashManager } from "../../services/HashManager";
import { TokenGenerator } from "../../services/TokenGenerator";
import { GetUserDatabase } from "./GetUserDatabase";

export class GetUserBusiness {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly hashManager: HashManager,
    private readonly getUserDatabase: GetUserDatabase
  ) {}
  
  public allUsers = async () => {
    try {
      const result = await this.getUserDatabase.allUsers();
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getUser = async (id: string, token: string) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      const userId = authenticatorData.id;

      if (!userId) {
        throw new InvalidToken();
      }
      if (!token) {
        throw new UserNotFound();
      }

      const result = await this.getUserDatabase.getUser(id);
      if (!result) {
        throw new Error("User not found.");
      }
      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
