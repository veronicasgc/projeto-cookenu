"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friends = void 0;
class Friends {
    constructor(id, userId1, userId2, status) {
        this.id = id;
        this.userId1 = userId1;
        this.userId2 = userId2;
        this.status = status;
    }
    getId() {
        return this.id;
    }
    getUserId1() {
        return this.userId1;
    }
    getUserId2() {
        return this.userId2;
    }
    getStatus() {
        return this.status;
    }
}
exports.Friends = Friends;
