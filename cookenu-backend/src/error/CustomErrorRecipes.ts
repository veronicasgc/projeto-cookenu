import { CustomError } from "./CustomError";

export class RecipeNotCreated extends CustomError {
    constructor() {
      super(404, "Recipe was not created because some data is missing or incorrect. Please enter title and description!");
    }
  }