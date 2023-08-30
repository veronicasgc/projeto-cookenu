import { Request, Response } from "express";
import { ForgotPasswordBusiness } from "./ForgotPasswordBusiness";
import { ForgotPasswordDatabase } from "./ForgotPasswordDatabase";

export class ForgotPasswordController {
  constructor(
    private readonly forgotPasswordBusiness: ForgotPasswordBusiness,
    private readonly forgotPasswordDatabase: ForgotPasswordDatabase
  ) {}
  public forgotPassword = async (req: Request, res: Response) => {
    try {
      const email = req.body.email;

      const newPassword = await this.forgotPasswordBusiness.forgotPassword(
        email
      );

      res
        .status(200)
        .send(
          `Password reset successfully.Your new password is: ${newPassword}`
        );
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };
}
