export class Recipe {
  constructor(
    private id: string,
    private title: string,
    private description: string,
    private deadline: Date,
    private authorId: string
  ) {}

  public getId(): string {
    return this.id;
  }
  public getTitle(): string {
    return this.title;
  }
  public getDescription(): string {
    return this.description;
  }
  public getDeadline(): Date {
    return this.deadline;
  }
  public getAuthorId(): string {
    return this.authorId;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setDescription(description: string) {
    this.description = description;
  }
  public setDeadline(deadline: Date) {
    this.deadline = deadline;
  }
  public setAuthorId(authorId: string) {
    this.authorId = authorId;
  }

  public static toRecipe(data?: any): Recipe {
    return (
      data &&
      new Recipe(
        data.id,
        data.title,
        data.description,
        data.deadline,
        data.authorId
      )
    );
  }
}

export interface RecipeInputDTO {
  title: string;
  description: string;
  
}


