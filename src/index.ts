/**
 * Required External Modules
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import app from "./bin/app";
import { PORT } from "./constants";

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
/**
 * Server Activation
 */
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
