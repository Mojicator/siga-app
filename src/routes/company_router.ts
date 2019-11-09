import { Router } from "express";
import * as CompanyController from "../controllers/company_controller";
import { checkToken } from '../helpers/auth_helper';

const router: Router = Router();

router.get("/companies", CompanyController.allCompanies);
router.get("/company/:id", CompanyController.showCompany);
router.post("/company", [checkToken], CompanyController.addCompany);
router.put("/company/:id", CompanyController.updateCompany);
router.delete("/company/:id", CompanyController.deleteCompany);
router.get("/company/:company_id/warehouses", CompanyController.getWarehousesByCompany);

export default router;