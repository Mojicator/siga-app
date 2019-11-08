import { Router } from 'express';
import * as AuthContoller from '../controllers/auth_controller';

const router: Router = Router();

router.post("/auth/login", AuthContoller.loginEmployee);

export default router;