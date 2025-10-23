import { Router } from "express";

import * as taskController from './tasks.controller.js';

import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

// router.use(authMiddleware);

router.post('/createTask', taskController.creatTask);

router.get('/getTasksByUserId', taskController.listAllTasksByUserId)

router.get('/getTodoListTasks', taskController.getTodoListTasks)

router.put('/updateTask', taskController.updateTask)

router.patch('/:taskId/:userId/toggle', taskController.toggleTask)

router.put('/:areaId/:userId/toggleAllActive', taskController.toggleAllActive)

router.delete('/deleteTask/:taskId', taskController.deleteTask)

export default router;