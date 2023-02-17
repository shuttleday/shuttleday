export interface User {
  email: string;
  firstName: string;
  lastName: string;
  nickname?: string;
  createdAt: Date;
}

export interface UserPayment {
  userEmail: string;
  paid: boolean;
  paidAt?: Date | undefined;
}

export interface GameSession {
  date: Date;
  players?: UserPayment[] | undefined;
  cost: number;
  payTo: User;
  group: string;
  createdAt: Date;
}
