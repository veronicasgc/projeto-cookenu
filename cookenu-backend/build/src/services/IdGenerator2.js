"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdGenerator2 = void 0;
const uuid_1 = require("uuid");
class IdGenerator2 {
    constructor() {
        this.generateId = () => (0, uuid_1.v3)("name", "namespace");
    }
}
exports.IdGenerator2 = IdGenerator2;
