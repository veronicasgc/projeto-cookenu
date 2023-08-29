import { CustomError } from "../error/CustomError";
import {  user } from "../models/User";
import { TokenGenerator } from "../services/TokenGenerator";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "cookenu_users";


  public insertUser = async (user: user) => {
    try {
      await UserDatabase.connection.queryBuilder()
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };
  
  
  public findUser = async (email: string) => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

 

   public allUsers = async () => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_NAME)
        .select()
        

      return result;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };


  public getUser = async (userId: string): Promise<any> => {
    try {
    
      const userData = await UserDatabase.connection.queryBuilder()
        .select('id','name', 'email')
        .where({ id:userId})
        .from(UserDatabase.TABLE_NAME)
        .first();
  
      if (!userData) {
        throw new CustomError(404, 'User not found');
      }
  
      const { id, name,email } = userData;
  
      return { id, name, email };
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public deleteAccount = async (userId: string) => {
    try {
      await UserDatabase.connection.transaction(async (trx) => {
        // Delete user's recipes
        await trx('recipes_table')
          .where('author_id', userId)
          .delete();
  
        // Delete user's friendships
        await trx('friendships')
          .where('user_id_1', userId)
          .orWhere('user_id_2', userId)
          .delete();
  
        // Delete user
        await trx(UserDatabase.TABLE_NAME)
          .where('id', userId)
          .delete();
      });
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
  
  public async updatePassword(userId: string, newPassword: string) {
    await UserDatabase.connection(UserDatabase.TABLE_NAME)
      .where({ id: userId })
      .update({ password: newPassword });
  }

  public generateRandomPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let newPassword = '';
    for (let i = 0; i < 8; i++) {
      newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return newPassword;
  }
   
}

