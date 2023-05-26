import { FileExtension } from "file-type";
import { WithId, Document } from "mongodb";

export enum UserType {
  Player = "PLAYER",
  Admin = "ADMIN",
}

interface QR {
  uploaded: boolean;
  fileExt: FileExtension | null;
}

export interface User extends WithId<Document> {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: Date;
  userType: UserType;
  QR: QR;
}

export interface UserPayment extends WithId<Document> {
  userEmail: string;
  username: string;
  paid: boolean;
  paidAt: Date | undefined;
  fileExt: FileExtension | null;
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

export interface Room extends WithId<Document> {
  name: string;
  description?: string;
  creator: User;
  createdAt: Date;
}
