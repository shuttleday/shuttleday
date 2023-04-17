import { WithId, Document } from "mongodb";

export enum UserType {
  Player = "PLAYER",
  Admin = "ADMIN",
}

export interface User extends WithId<Document> {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  userType: UserType;
  hasQR: boolean;
}

export interface UserPayment extends WithId<Document> {
  userEmail: string;
  username: string;
  paid: boolean;
  paidAt: Date | undefined;
  paymentImage?: string; // s3 link
}

export interface GameSession extends WithId<Document> {
  start: Date;
  end: Date;
  players: UserPayment[];
  cost: number;
  payTo: string; // email
  courts: string[];
  createdAt: Date;
  title?: string;
}
