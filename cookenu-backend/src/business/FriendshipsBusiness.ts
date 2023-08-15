import { FriendshipsDatabase } from "../data/FriendshipsDatabase";
import { CustomError } from "../error/CustomError";
import { invalidBeFriendsAgain, invalidYouBeYourFriend } from "../error/CustomErrorFriend";
import { InvalidToken } from "../error/CustomErrorToken";
import { MissingFieldsToComplete } from "../error/MissingFieldsComplete";
import { Friend, FriendInputDTO, FriendInsert } from "../models/Friend";
import { IdGenerator } from "../services/IdGenerator";
import { TokenGenerator } from "../services/TokenGenerator";


export class FriendshipsBusiness {
  constructor(
    private readonly friendshipsDatabase: FriendshipsDatabase,
    private readonly idGenerator: IdGenerator,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  public beFriend = async (input: FriendInsert, token:string): Promise<void> => {
    try {
      if (!input.userId2 || input.userId2.trim() === '') {
        throw new Error('Invalid userToFollowId.');
      }

     
      const authenticatorData = this.tokenGenerator.tokenData(token);
      const userId1 = authenticatorData.id;
      
  
      if (userId1 === input.userId2) {
        throw new invalidYouBeYourFriend();
      }

      const existingRequest = await this.friendshipsDatabase.getFriendshipByUsers({
        userId1,
        userId2: input.userId2,
      });
  
      if (existingRequest && existingRequest.status === 'PENDING') {
    
        await this.friendshipsDatabase.updateFriendshipStatus(existingRequest.id, 'ACCEPTED');
      } else {
      
        const friend: Friend = {
          id: this.idGenerator.generateId(),
          userId1,
          userId2: input.userId2,
          status: 'PENDING',
        };
        await this.friendshipsDatabase.beFriend(friend);
      }
  } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

  public unfollowFriend = async (input: FriendInsert, token:string): Promise<void> => {
    try {
      if (!input.userId2 || input.userId2.trim() === '') {
        throw new Error('Invalid userToFollowId.');
      }

     
      const authenticatorData = this.tokenGenerator.tokenData(token);

      
      if(!token){
        throw new InvalidToken()
      }

      const userId1 = authenticatorData.id;
      
  
      if (userId1 === input.userId2) {
        throw new invalidYouBeYourFriend();
      }

      const existingRequest = await this.friendshipsDatabase.getFriendshipByUsers({
        userId1,
        userId2: input.userId2,
      });
  
      if (existingRequest && existingRequest.status === 'ACCEPTED') {
      
        await this.friendshipsDatabase.updateFriendshipStatus(existingRequest.id, 'PENDING');
      } else {
       
        const friend: Friend = {
          id: this.idGenerator.generateId(),
          userId1,
          userId2: input.userId2,
          status: 'PENDING',
        };
        await this.friendshipsDatabase.beFriend(friend);
      }
  } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  };

 public getFeedFriends = async( token: string)=> {
    try {
      if(!token){
        throw new InvalidToken()
      }
      
      const authenticatorData = this.tokenGenerator.tokenData(token);
    
      const userId1 =authenticatorData.id

      const result = await this.friendshipsDatabase.getFeedFriends(userId1)

      const recipes = result.map((recipe) => ({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        deadline: recipe.deadline,
        userId: recipe.userId,
        userName: recipe.userName,
    }));
    
      return {recipes};
    } catch (error: any) {
      throw new CustomError(error.statusCode || 500, error.message);
    }
  }

}
