"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeNotCreated = exports.Unauthorized = exports.UserNotFound = exports.InvalidPassword = exports.InvalidRole = exports.InvalidEmail = exports.InvalidName = exports.CustomError = void 0;
class CustomError extends Error {
    constructor(statusCode, message) {
        super(message);
    }
}
exports.CustomError = CustomError;
class InvalidName extends CustomError {
    constructor() {
        super(400, "Nome inválido");
    }
}
exports.InvalidName = InvalidName;
class InvalidEmail extends CustomError {
    constructor() {
        super(400, "Email inválido");
    }
}
exports.InvalidEmail = InvalidEmail;
class InvalidRole extends CustomError {
    constructor() {
        super(400, "Cargo inválido");
    }
}
exports.InvalidRole = InvalidRole;
class InvalidPassword extends CustomError {
    constructor() {
        super(400, "Senha inválida. Insira uma senha de pelo menos 6 caracteres!");
    }
}
exports.InvalidPassword = InvalidPassword;
class UserNotFound extends CustomError {
    constructor() {
        super(404, "Usuário não encontrado");
    }
}
exports.UserNotFound = UserNotFound;
class Unauthorized extends CustomError {
    constructor() {
        super(401, "Usuário não autorizado");
    }
}
exports.Unauthorized = Unauthorized;
//==============================================================================================
//RECEITAS ERRORS
class RecipeNotCreated extends CustomError {
    constructor() {
        super(404, "Receita não foi criada pois está faltando algum dado ou está incorreto. Por favor, insira título, descrição e data de criação!");
    }
}
exports.RecipeNotCreated = RecipeNotCreated;
