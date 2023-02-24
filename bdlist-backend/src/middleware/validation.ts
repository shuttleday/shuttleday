export const requiredBody = {
  "/users": ["username"],
  "/game-sessions": ["start", "end", "cost", "courts", "group", "payTo"],
  "/session-players": ["sessionId"],
  "/refreshToken": ["refreshToken"],
};

// For future use
// export const requiredQuery = {
//   "/users": ["email", "firstName", "lastName", "username"],
// };
