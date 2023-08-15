import { Request, Response } from "express"
import { FriendshipsBusiness } from "../business/FriendshipsBusiness"
import { FriendInputDTO, FriendInsert } from "../models/Friend"
import { InvalidToken } from "../error/CustomErrorToken";

export class FriendshipsController {
    constructor(
        private readonly friendshipsBusiness: FriendshipsBusiness
    ){}
    public beFriend = async (req: Request, res: Response) => {
        try {
            const {userId2 } = req.body 

            const token = req.headers.authorization as string

            if (!token) {
               throw new InvalidToken()
              }

              const friendInsert: FriendInsert = {
                userId1: '',
                userId2,
              };

            await this.friendshipsBusiness.beFriend(friendInsert, token)

            res.status(200).send({ message: 'Followed successfully' })
        } catch (error) {
            res.status(400).send({ error: 'Failed to follow user.' });
        }
    }

    public unfollowFriend = async (req: Request, res: Response) => {
        try {
            const {userId2 } = req.body 

            const token = req.headers.authorization as string

            if (!token) {
               throw new InvalidToken()
              }

              const friendInsert: FriendInsert = {
                userId1: '',
                userId2,
              };

            await this.friendshipsBusiness.unfollowFriend(friendInsert, token)

            res.status(200).send({ message: 'Unfollowed successfully' })
        } catch (error) {
            res.status(400).send({ error: 'Failed to follow user.' });
        }
    }

   public getFeedFriends = async(req: Request, res: Response)=> {
        try {
            const token = req.headers.authorization as string;
  
    
          const friendRecipes = await this.friendshipsBusiness.getFeedFriends(token);

          res.status(200).send(friendRecipes);
        } catch (error: any) {
          res.status(error.statusCode).send(error.sqlMessage || error.message);
        }
      }
}