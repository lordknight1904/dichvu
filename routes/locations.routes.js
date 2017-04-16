import { Router } from 'express';
import * as LocationController from '../controllers/location.controller';
const router = new Router();

router.route('/locationlist').get(LocationController.getLocations);

export default router;