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
