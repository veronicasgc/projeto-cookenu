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
exports.DeleteAccountController = void 0;
class DeleteAccountController {
    constructor(deleteAccountBusiness) {
        this.deleteAccountBusiness = deleteAccountBusiness;
        this.deleteAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                const token = req.headers.authorization;
                yield this.deleteAccountBusiness.deleteAccount(userId, token);
                res.status(200).send('Account deteled successfully.');
            }
            catch (error) {
                console.log('Controller error:', error);
                res.status(400).send(error);
            }
        });
    }
}
exports.DeleteAccountController = DeleteAccountController;
