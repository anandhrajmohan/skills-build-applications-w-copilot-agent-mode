import cors from 'cors';
import express, { type NextFunction, type Request, type Response } from 'express';
import mongoose from 'mongoose';
import './config/database.js';
import { frontendOrigin } from './config/urls.js';
import apiRouter from './routes/index.js';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const codespaceApiSuffix = '-8000.app.github.dev';
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}${codespaceApiSuffix}`
  : `http://localhost:${port}`;

app.use(cors({ origin: frontendOrigin }));
app.use(express.json());
app.use('/api', apiRouter);

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  const isValidationError = error instanceof mongoose.Error.ValidationError;
  const isDuplicateKeyError =
    typeof error === 'object' && error !== null && 'code' in error && error.code === 11000;
  const status = isValidationError ? 400 : isDuplicateKeyError ? 409 : 500;
  response.status(status).json({
    error: status === 500 ? 'Internal server error' : (error as Error).message,
  });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});