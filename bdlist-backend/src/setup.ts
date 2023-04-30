import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();

import routes from "./routes/index.js";
import { authenticate } from "./middleware/authenticate.js";
import errorHandler from "./middleware/errorHandler.js";
import {
  validateGET,
  validatePATCH,
  validatePOST,
} from "./middleware/validateRequest.js";

export const app = express();

const corsOptions = {
  origin:
    process.env.NODE_ENV === "production" ? "https://shuttleday.info" : "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Parse requests of content-type - application/json.
app.use(express.json());

// Enable CORS on all routes
app.use(cors(corsOptions));

// Authentication middleware
app.use(authenticate);

// Request validation middleware
app.use(validateGET);
app.use(validatePOST);
app.use(validatePATCH);

// Load routes
routes(app);

// Load error handler
app.use(errorHandler);

export default app;
