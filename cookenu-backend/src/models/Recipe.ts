export type Recipe = {
    id: string,
    title: string,
    description: string,
    deadline: Date,
    authorId: string
}

export interface RecipeInputDTO {
    title: string,
    description: string,
    deadline: Date,
    authorId:string
}