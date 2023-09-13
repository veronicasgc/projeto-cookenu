import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";
import { UserNotFound } from "../../error/CustomErrorUser";

export class GetUserDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_users";

  public allUsers = async () => {
    try {
      const result = await GetUserDatabase.connection(
        GetUserDatabase.TABLE_NAME
      ).select();

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public getUser = async (userId: string): Promise<any> => {
    try {
      const userData = await GetUserDatabase.connection
        .queryBuilder()
        .select("id", "name", "email")
        .where({ id: userId })
        .from(GetUserDatabase.TABLE_NAME)
        .first();

      if (!userData) {
        throw new UserNotFound();
      }

      const { id, name, email } = userData;

      return { id, name, email };
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
}
