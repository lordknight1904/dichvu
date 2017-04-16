import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const router = new Router();

router.route('/user/signup').post(UserController.signUp);
router.route('/user/login').post(UserController.login);
router.route('/user/update').post(UserController.update);

export default router;