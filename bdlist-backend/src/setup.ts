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

// Parse requests of content-type - application/json.
app.use(express.json());

// Enable CORS on all routes
app.use(cors());

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
