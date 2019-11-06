import express from 'express';
import CompanyRouter from './company_router';

const app: express.Application = express();

app.use(CompanyRouter);

export default app;