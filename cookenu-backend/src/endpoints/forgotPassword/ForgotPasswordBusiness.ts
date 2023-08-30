import { CustomError } from "../../error/CustomError";
import { LoginUserDatabase } from "../loginUser/LoginUserDatabase";
import { ForgotPasswordDatabase } from "./ForgotPasswordDatabase";

export class ForgotPasswordBusiness {
  constructor(
    private readonly forgotPasswordDatabase: ForgotPasswordDatabase,
    private readonly loginUserDatabase: LoginUserDatabase
  ) {}

  public async forgotPassword(email: string) {
    try {
      const user = await this.loginUserDatabase.findUser(email);

      if (!user) {
        throw new Error("Email not found.");
      }
      const generatedPassword =
        this.forgotPasswordDatabase.generateRandomPassword();

      await this.forgotPasswordDatabase.updatePassword(
        user.id,
        generatedPassword
      );
      await this.forgotPasswordDatabase.setGeneratedPasswordFlag(user.id, true);

      return generatedPassword;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}
