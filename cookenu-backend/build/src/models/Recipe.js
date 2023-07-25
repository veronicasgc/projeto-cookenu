"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recipe = void 0;
class Recipe {
    constructor(id, title, description, deadline, authorId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.authorId = authorId;
    }
    getId() {
        return this.id;
    }
    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getDeadline() {
        return this.deadline;
    }
    getAuthorId() {
        return this.authorId;
    }
    setTitle(title) {
        this.title = title;
    }
    setDescription(description) {
        this.description = description;
    }
    setDeadline(deadline) {
        this.deadline = deadline;
    }
    setAuthorId(authorId) {
        this.authorId = authorId;
    }
    static toRecipe(data) {
        return (data &&
            new Recipe(data.id, data.title, data.description, data.deadline, data.authorId));
    }
}
exports.Recipe = Recipe;
