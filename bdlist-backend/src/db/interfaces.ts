export interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  userType: string;
}

export interface UserPayment {
  userEmail: string;
  paid: boolean;
  paidAt?: Date | undefined;
}

export interface GameSession {
  date: Date;
  players?: UserPayment[];
  cost: number;
  payTo: User;
  group: string;
  createdAt: Date;
}

export interface Password {
  name: string;
  password: string;
  desc?: string;
}
