export const requiredBody = {
  "/user": ["email", "firstName", "lastName", "username"],
  "/game-sessions": ["start", "end", "cost", "courts", "group", "payTo"],
  "/session-players": ["sessionId", "userEmail"],
  "/user-payments": ["sessionId", "playerEmail"],
};
