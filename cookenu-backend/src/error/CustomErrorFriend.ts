import { CustomError } from "./CustomError";

export class invalidYouBeYourFriend extends CustomError{
    constructor(){
        super(409, "You can't be friends with yourself")
    }
}

export class invalidBeFriendsAgain extends CustomError{
    constructor(){
        super(409, "You are already a friend of the user")
    }
}

export class invalidMakeFriendship extends CustomError{
    constructor(){
        super(401, "invalid the MakeFriendship is required to pass the query.")
    }
}