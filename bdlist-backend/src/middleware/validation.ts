export const requiredBody = {
  "/users": ["email", "firstName", "lastName", "username"],
  "/game-sessions": ["start", "end", "cost", "courts", "group", "payTo"],
  "/session-players": ["sessionId", "userEmail"],
  "/user-payments": ["sessionId", "playerEmail"],
  "/refreshToken": ["refreshToken"],
  "/signin": ["email"],
};

// For future use
// export const requiredQuery = {
//   "/users": ["email", "firstName", "lastName", "username"],
// };
