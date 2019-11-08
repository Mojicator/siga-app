import { Router } from 'express';
import * as EmployeeController from '../controllers/employee_controller';

const router: Router = Router();

router.get("/employees", EmployeeController.allEmployees);
router.get("/employee/:id", EmployeeController.employeeById);
router.post("/employee", EmployeeController.addEmployee);
router.put("/employee/:id", EmployeeController.updateEmployee);
router.delete("/employee/:id", EmployeeController.deleteEmployee);

export default router;