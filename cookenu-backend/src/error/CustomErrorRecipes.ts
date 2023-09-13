import { CustomError } from "./CustomError";

export class RecipeNotCreated extends CustomError {
    constructor() {
      super(404, "Recipe was not created because some data is missing or incorrect. Please enter title and description!");
    }
  }

  
export class RecipeNotFound extends CustomError {
  constructor() {
    super(404, "Recipe not found!");
  }
}

export class UnableToDeleteRecipe extends CustomError {
  constructor() {
    super(404, "You do not have permission to delete this recipe.");
  }
}

export class UnableToEditRecipe extends CustomError {
  constructor() {
    super(404, "You do not have permission to edit this recipe.");
  }
}
