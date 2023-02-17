export interface User {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  userType: string; // player | admin
}

export interface UserPayment {
  userEmail: string;
  paid: boolean;
  paidAt: Date | undefined;
  paymentImage?: string; // s3 link
}

export interface GameSession {
  start: Date;
  end: Date;
  players?: UserPayment[];
  cost: number;
  payTo: string; // username
  group: string;
  createdAt: Date;
}

export interface Password {
  name: string;
  password: string;
  desc?: string;
}
