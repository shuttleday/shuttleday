export const requiredBody = {
  "/users": ["username"],
  "/game-sessions": ["start", "end", "cost", "courts"],
  "/session-players": ["sessionId"],
  "/refreshToken": ["refreshToken"],
};

export const requiredQuery = {
  "/payment-receipts": ["sessionId"],
};
