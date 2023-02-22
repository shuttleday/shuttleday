import { WithId, Document } from "mongodb";

export interface User extends WithId<Document> {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  userType: string; // player | admin
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

export interface UserPayment extends WithId<Document> {
  userEmail: string;
  paid: boolean;
  paidAt: Date | undefined;
  paymentImage?: string; // s3 link
}

export interface GameSession extends WithId<Document> {
  start: Date;
  end: Date;
  players?: UserPayment[];
  cost: number;
  payTo: string; // email
  courts: string[];
  group: string;
  createdAt: Date;
}
