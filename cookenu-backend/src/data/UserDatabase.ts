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


  public getUser = async (token: string) => {
    try {
      const tokenGenerator = new TokenGenerator()
      const tokenData = tokenGenerator.tokenData(token);
      const userData = await UserDatabase.connection.queryBuilder()
        .select('id', 'email')
        .where({ id: tokenData.id})
        .from(UserDatabase.TABLE_NAME)
        .first();
  
      if (!userData) {
        throw new CustomError(404, 'User not found');
      }
  
      const { id, email } = userData;
  
      return { id, email };
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  

 
}

