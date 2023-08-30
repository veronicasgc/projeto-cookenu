import { BaseDatabase } from "../../data/BaseDatabase";
import { CustomError } from "../../error/CustomError";


export class DeleteAccountDatabase extends BaseDatabase{

    private static TABLE_NAME = "cookenu_users";

    public deleteAccount = async (userId: string) => {
        try {
          await DeleteAccountDatabase.connection.transaction(async (trx) => {
   
            await trx('recipes_table')
              .where('author_id', userId)
              .delete();
      
        
            await trx('friendships')
              .where('user_id_1', userId)
              .orWhere('user_id_2', userId)
              .delete();
      
   
            await trx(DeleteAccountDatabase.TABLE_NAME)
              .where('id', userId)
              .delete();
          });
        } catch (error: any) {
          throw new CustomError(400, error.message);
        }
      }
    
}

