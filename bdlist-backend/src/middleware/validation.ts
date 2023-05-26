export interface requiredMETHOD {
  [s: string]: string[];
}

export const requiredPOST: requiredMETHOD = {
  "/auth/register": ["username"],
  "/game-sessions": ["start", "end", "cost", "courts"],
  "/session-players": ["sessionId"],
  "/refreshToken": ["refreshToken"],
  "/rooms": ["name"],
};

export const requiredGET: requiredMETHOD = {
  "/payment-receipts": ["sessionId"],
};

export const requiredPATCH: requiredMETHOD = {
  "/game-sessions": ["sessionId", "start", "end", "cost", "payTo", "courts"],
  "/rooms": ["name"],
};
