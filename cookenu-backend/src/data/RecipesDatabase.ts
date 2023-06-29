import { Recipe } from "../models/Recipe"
import { BaseDatabase } from "./BaseDatabase"

export class RecipeDatabase extends BaseDatabase {
    
    private static TABLE_NAME = "Recipes_table"

    public createRecipe = async(recipe: Recipe) =>{
        await RecipeDatabase.connection()
            .insert({
                id: recipe.id,
                title: recipe.title,
                description: recipe.description,
                deadline: recipe.deadline,
                author_id: recipe.author_id
            }).into(RecipeDatabase.TABLE_NAME)
    }

    public getRecipeById = async(id: string)=>{
        const searchResult = await RecipeDatabase.connection(RecipeDatabase.TABLE_NAME)
        .select('*')
        .where({id})

        const recipeResult = {
            id: searchResult[0].id,
            title: searchResult[0].title,
            description: searchResult[0].description,
            deadline: searchResult[0].deadline,
            authorId: searchResult[0].author_id
        }
        return recipeResult
    }
}