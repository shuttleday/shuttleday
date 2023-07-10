export interface QR {
  uploaded: boolean;
  fileExt: string;
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  createdAt: string;
  QR: QR;
  isAdmin: boolean;
}

export interface SessionData {
  start: string;
  end: string;
  courts: string[];
  payTo: string;
  cost: number;
  sessionId: string;
  title: string;
}

export interface Room {
  name: string;
  description: string;
}

export interface Info {
  name: string;
  title: string;
  image: string;
  gradients: string;
  lore: string;
}

export interface Player {
  paid: boolean;
  paidAt?: string;
  userEmail: string;
  username: string;
}
export interface Session {
  _id: string;
  start: string;
  end: string;
  players: Player[];
  cost: number;
  courts: string[];
  createdAt: string;
  payTo: string;
  title: string;
  roomId: string;
}
