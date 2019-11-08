import { Router } from 'express';
import * as EmployeeController from '../controllers/employee_controller';

const router: Router = Router();

router.get("/employees", EmployeeController.allEmployees);
router.post("/employee", EmployeeController.addEmployee);

export default router;