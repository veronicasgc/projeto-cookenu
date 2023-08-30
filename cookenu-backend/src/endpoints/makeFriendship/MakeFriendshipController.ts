import { Request, Response } from "express";
import { InvalidToken } from "../../error/CustomErrorToken";
import { FriendInsert } from "../../models/Friend";
import { MakeFriendshipBusiness } from "./MakeFriendshipBusiness";

export class MakeFriendshipsController {
  constructor(
    private readonly makeFriendshipBusiness: MakeFriendshipBusiness
  ) {}
  public beFriend = async (req: Request, res: Response) => {
    try {
      const { userId2 } = req.body;

      const token = req.headers.authorization as string;

      if (!token) {
        throw new InvalidToken();
      }

      const friendInsert: FriendInsert = {
        userId1: "",
        userId2,
      };

      await this.makeFriendshipBusiness.beFriend(friendInsert, token);

      res.status(200).send({ message: "Followed successfully" });
    } catch (error) {
      res.status(400).send({ error: "Failed to follow user." });
    }
  };
}
