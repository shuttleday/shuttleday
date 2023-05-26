export interface requiredMETHOD {
  [s: string]: string[];
}

export const requiredPOST: requiredMETHOD = {
  "/auth/register": ["username"],
  "/rooms/:roomId/sessions": ["start", "end", "cost", "courts"],
  "/session-players": ["sessionId"],
  "/refreshToken": ["refreshToken"],
  "/rooms": ["name"],
};

export const requiredGET: requiredMETHOD = {};

export const requiredPATCH: requiredMETHOD = {
  "/rooms/:roomId/sessions": [
    "sessionId",
    "start",
    "end",
    "cost",
    "payTo",
    "courts",
  ],
  "/rooms": ["name"],
};
