import { Router } from "express";
import * as userController from './user.controller.js';

const router = Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/', userController.getUserById);

router.post('/concludeOnboarding', userController.concludeOnboarding);

export default router;