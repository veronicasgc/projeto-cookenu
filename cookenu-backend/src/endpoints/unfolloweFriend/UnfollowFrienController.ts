import { Request, Response } from "express"
import { InvalidToken } from "../../error/CustomErrorToken";
import { FriendInsert } from "../../models/Friend";
import { UnfollowFriendBusiness } from "./UnfollowFriendBusiness";


export class UnfollowFriendController {
    constructor(
        private readonly unfollowFriendBusiness: UnfollowFriendBusiness
    ){}

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

            await this.unfollowFriendBusiness.unfollowFriend(friendInsert, token)

            res.status(200).send({ message: 'Unfollowed successfully' })
        } catch (error) {
            res.status(400).send({ error: 'Failed to follow user.' });
        }
    }
}