import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";

export class ForgotPasswordDatabase extends BaseDatabase {
  private static TABLE_NAME = "cookenu_users";

  public async updatePassword(userId: string, newPassword: string) {
    try {
      await ForgotPasswordDatabase.connection(ForgotPasswordDatabase.TABLE_NAME)
      .where({ id: userId })
      .update({ password: newPassword });
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
 
  }

  public generateRandomPassword() {
    try {
      const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newPassword = "";
    for (let i = 0; i < 8; i++) {
      newPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return newPassword;
    } catch (error:any) {
      throw new CustomError(400, error.message);
    }
 
  }
  public async setGeneratedPasswordFlag(
    userId: string,
    isGeneratedPassword: boolean
  ) {
    try {
      await ForgotPasswordDatabase.connection(ForgotPasswordDatabase.TABLE_NAME)
        .where({ id: userId })
        .update({ isGeneratedPassword });
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
