import express from 'express';
import CompanyRouter from './company_router';
import EmployeeRouter from './employee_router';
import AuthRouter from './auth_router';

const app: express.Application = express();

app.use(CompanyRouter);
app.use(AuthRouter);
app.use(EmployeeRouter);

export default app;