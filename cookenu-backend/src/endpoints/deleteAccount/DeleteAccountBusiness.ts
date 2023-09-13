import { TokenGenerator } from "../../services/TokenGenerator";
import { DeleteAccountDatabase } from "./DeleteAccountDatabase";

export class DeleteAccountBusiness {
  constructor(
    private readonly tokenGenerator: TokenGenerator,
    private readonly deleteAccountDatabase: DeleteAccountDatabase
  ) {}
  public deleteAccount = async (id: string, token: string) => {
    try {
      const authenticatorData = this.tokenGenerator.tokenData(token);

      if (authenticatorData.role === "NORMAL" && authenticatorData.id !== id) {
        throw new Error("You do not have permission to delete this account.");
      }
      await this.deleteAccountDatabase.deleteAccount(id);
    } catch (error: any) {
      console.log("Error in deleteAccount:", error.message);
      throw new Error("Unable to delete account.");
    }
  };
}
