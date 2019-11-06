import { Router } from "express";
import * as CompanyController from "../controllers/company_controller";

const router: Router = Router();

router.get("/companies", CompanyController.allCompanies);
router.get("/company/:id", CompanyController.showCompany);
router.post("/company", CompanyController.addCompany);
router.put("/company/:id", CompanyController.updateCompany);
router.delete("/company/:id", CompanyController.deleteCompany);

export default router;