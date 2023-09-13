import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";
import { user } from "../../models/User";

export class CreateUserDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_users";

  public insertUser = async (user: user) => {
    try {
      await CreateUserDatabase.connection
        .queryBuilder()
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
          isGeneratedPassword: true,
        })
        .into(CreateUserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
