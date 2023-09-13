"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteAccountDatabase = void 0;
const BaseDatabase_1 = require("../../data/BaseDatabase");
const CustomError_1 = require("../../error/CustomError");
class DeleteAccountDatabase extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.deleteAccount = (userId) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield DeleteAccountDatabase.connection.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    yield trx('recipes_table')
                        .where('author_id', userId)
                        .delete();
                    yield trx('friendships')
                        .where('user_id_1', userId)
                        .orWhere('user_id_2', userId)
                        .delete();
                    yield trx(DeleteAccountDatabase.TABLE_NAME)
                        .where('id', userId)
                        .delete();
                }));
            }
            catch (error) {
                throw new CustomError_1.CustomError(400, error.message);
            }
        });
    }
}
exports.DeleteAccountDatabase = DeleteAccountDatabase;
DeleteAccountDatabase.TABLE_NAME = "cookenu_users";
