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
exports.ForgotPasswordController = void 0;
class ForgotPasswordController {
    constructor(forgotPasswordBusiness) {
        this.forgotPasswordBusiness = forgotPasswordBusiness;
        this.forgotPassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const newPassword = yield this.forgotPasswordBusiness.forgotPassword(email);
                res
                    .status(200)
                    .send(`Password reset successfully.Your new password is: ${newPassword}`);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
