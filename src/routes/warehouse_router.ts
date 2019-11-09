import { Router } from 'express';
import * as WarehouseController from '../controllers/warehouse_controller';

const router: Router = Router();

router.get("/warehouses", WarehouseController.allWarehouses);
router.get("/warehouse/:id", WarehouseController.showWarehouse);
router.post("/warehouse/:company_id", WarehouseController.addWarehouse);
router.put("/warehouse/:id", WarehouseController.updateWarehouse);
router.delete("/warehouse/:id", WarehouseController.deleteWarehouse);

export default router;