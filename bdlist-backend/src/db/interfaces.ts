export interface User {
  email: string;
  firstName: string;
  lastName: string;
  nickname: string | null;
}

export interface UserPayment {
  user: User;
  paid: boolean;
}

export interface GameSession {
  date: Date;
  players: UserPayment[];
  cost: number;
  group: string;
}
