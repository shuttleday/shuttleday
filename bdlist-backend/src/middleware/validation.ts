export const requiredPOST = {
  "/users": ["username"],
  "/game-sessions": ["start", "end", "cost", "courts"],
  "/session-players": ["sessionId"],
  "/refreshToken": ["refreshToken"],
};

export const requiredGET = {
  "/payment-receipts": ["sessionId"],
};

export const requiredPATCH = {
  "/game-sessions": ["sessionId", "start", "end", "cost", "payTo", "courts"],
};
