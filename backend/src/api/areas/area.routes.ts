import { Router } from "express";

import * as areaController from './area.controller.js';
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

// router.use(authMiddleware);

router.post('/createAreas', areaController.createAreas);

router.post('/createArea', areaController.createArea);

router.put('/updateArea', areaController.updateArea);

router.delete('/deleteArea', areaController.deleteArea);

router.get('/getAreasByUserId', areaController.getAreasByUserId);

export default router;