import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";

export class LoginUserDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_users";
  public findUser = async (email: string) => {
    try {
      const result = await LoginUserDatabase.connection(
        LoginUserDatabase.TABLE_NAME
      )
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
