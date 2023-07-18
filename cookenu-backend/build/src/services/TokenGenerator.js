"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGenerator = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const User_1 = require("../models/User");
class TokenGenerator {
    constructor() {
        this.generateToken = (id, role) => {
            const token = jwt.sign({ id, role }, process.env.JWT_KEY, {
                expiresIn: "1h",
            });
            return token;
        };
        this.tokenData = (token) => {
            const payload = jwt.verify(token, process.env.JWT_KEY);
            return {
                id: payload.id,
                role: User_1.UserRole[payload.role],
            };
        };
    }
}
exports.TokenGenerator = TokenGenerator;
