import { UserDatabase } from "../data/UserDatabase";
import { CustomError } from "../error/CustomError";
import { InvalidToken } from "../error/CustomErrorToken";
import {InvalidEmail, InvalidName,InvalidPassword, UserNotFound,InvalidRole} from "../error/CustomErrorUser";
import { MissingFieldsToComplete } from "../error/MissingFieldsComplete";
import { UserInputDTO, user, LoginInputDTO, UserRole} from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGeneratorInterface } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";


export class UserBusiness {
  constructor(
    private readonly idGenerator: IdGeneratorInterface,
    private readonly tokenGenerator: TokenGenerator,
    private readonly hashManager: HashManager,
    private readonly userDatabase: UserDatabase
  ) {}

  public createUser = async (input: UserInputDTO): Promise<string> => {
    try {
      const { name, email, password } = input;
      let role = input.role
    

      if (!name || !email || !password || !role) {
        throw new CustomError(400,'Preencha os campos "name", "email", "password" e "role"');
      }

      if (name.length < 4) {
        throw new InvalidName();
      }

      if (password.length < 6) {
        throw new InvalidPassword();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

     

      if (role !== "NORMAL" && role !== "ADMIN") {
        throw new InvalidRole();
      }

      if (role !== "NORMAL" && role !== "ADMIN") {
        role = "NORMAL";
      }

      const id: string = this.idGenerator.generateId();

      const hashPassword: string = await this.hashManager.hash(password);

      const user: user = {
        id,
        name,
        email,
        password: hashPassword,
        role: UserRole[role as keyof typeof UserRole]
      };

      // if (user.email === email) {
      //   throw new CustomError(400,'Email já cadastrado!');;
      // }

      await this.userDatabase.insertUser(user);
      const token = this.tokenGenerator.generateToken(id, user.role);

      return token;
    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public login = async (input: LoginInputDTO): Promise<string> => {
    try {
      const { email, password } = input;
      console.log("Login input:", input);

      if (!email || !password) {
        throw new MissingFieldsToComplete();
      }

      if (!email.includes("@")) {
        throw new InvalidEmail();
      }

      const user = await this.userDatabase.findUser(email);
      console.log("User:", user);

      if (!user) {
        throw new UserNotFound();
      }

      let isValidPassword: boolean = false

      if (user.isGeneratedPassword && password === user.generatedPassword) {
        isValidPassword = true;
      } else {
        isValidPassword = await this.hashManager.compare(
          password,
          user.password
        );
      }
  
      
      // if (!isValidPassword) {
      //   throw new InvalidPassword();
      // }

      const token = this.tokenGenerator.generateToken(user.id, user.role);

      return token;
    } catch (error: any) {
      console.log("Error in login:", error.message);
      throw new CustomError(400, error.message);
    }
  };


public allUsers = async () => {
  try {
    const result = await this.userDatabase.allUsers();
    return result;

  } catch (error: any) {
    throw new CustomError(400, error.message);
  }
};


public getUser = async (id: string, token: string) => {
  try {
 
    const authenticatorData = this.tokenGenerator.tokenData(token);

    const userId = authenticatorData.id;

    if(!userId){
      throw new InvalidToken()
    }
    if(!token){
      throw new UserNotFound
    }
     
    const result = await this.userDatabase.getUser(id);
    if (!result) {
      throw new Error('User not found.');
    }
    return result;

  } catch (error: any) {
    throw new CustomError(400, error.message);
  }
};

public deleteAccount = async (id: string, token: string) => {
  try {
    const authenticatorData = this.tokenGenerator.tokenData(token);


    if (authenticatorData.role === 'NORMAL' && authenticatorData.id !== id) {
      throw new Error('You do not have permission to delete this account.');
    }
    await this.userDatabase.deleteAccount(id)

  } catch (error: any) {
    console.log('Error in deleteAccount:', error.message);
    throw new Error('Unable to delete account.');
  }
 
  
}
public async forgotPassword(email: string) {
try {
  const user = await this.userDatabase.findUser(email);

  if (!user) {
    throw new Error('Email not found.');
  }
  const generatedPassword = this.userDatabase.generateRandomPassword();

  await this.userDatabase.updatePassword(user.id, generatedPassword);
  return generatedPassword;
} catch (error: any) {
  throw new CustomError(400, error.message);
}
  
}
}

