import { Router } from 'express';
import * as PriceHistoryController from "../controllers/priceHistory_controller";

const router: Router = Router();

router.get("/histories", PriceHistoryController.allPriceHistories);
router.get("/history/:id", PriceHistoryController.showPriceHistory);
router.post("/history/:id", PriceHistoryController.addNewPrice);
router.put("/history/:id", PriceHistoryController.updatePriceHistory);
router.delete("/history/:id", PriceHistoryController.deletePriceHistory);


export default router;