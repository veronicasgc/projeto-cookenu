import { CustomError } from "./CustomError";

export class MissingFieldsToComplete extends CustomError {
    constructor(){
        super(401, "Missing fields to complete")
    }
} 