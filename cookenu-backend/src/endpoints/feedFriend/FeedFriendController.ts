import { Request, Response } from "express";
import { FeedFriendBusiness } from "./FeedFriendBusiness";

export class FeedFriendController {
  constructor(private readonly feedFriendBusiness: FeedFriendBusiness) {}

  public getFeedFriends = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization as string;

      const friendRecipes = await this.feedFriendBusiness.getFeedFriends(token);

      res.status(200).send(friendRecipes);
    } catch (error: any) {
      res.status(error.statusCode).send(error.sqlMessage || error.message);
    }
  };
}
