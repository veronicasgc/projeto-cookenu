import { CustomError } from "./CustomError";

export class InvalidToBeYourFriend extends CustomError{
    constructor(){
        super(409, "You can't be friends with yourself")
    }
}

export class InvalidBeFriendsAgain extends CustomError{
    constructor(){
        super(409, "You are already a friend of the user")
    }
}

export class InvalidMakeFriendship extends CustomError{
    constructor(){
        super(401, "Invalid the MakeFriendship.")
    }
}

export class FriendNotFound extends CustomError{
    constructor(){
        super(401, "Friend not Found.")
    }
}