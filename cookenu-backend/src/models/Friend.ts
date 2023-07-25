export class Friends {
    constructor(
      private id: string,
      private userId1: string,
      private userId2: string,
      private status: string
    ) {}
  
    public getId() {
      return this.id;
    }
  
    public getUserId1() {
      return this.userId1;
    }
  
    public getUserId2() {
      return this.userId2;
    }
  
    public getStatus() {
      return this.status;
    }
  }
  
  export interface FriendInputDTO {
    userId1: string;
    userId2: string;
   
  }

  export type Friend = {
    id: string;
    userId1: string;
    userId2: string;
    status: string;
  };
  export type FriendInsert = {
    userId1: string;
    userId2: string;
    status?: string; 
  };
    