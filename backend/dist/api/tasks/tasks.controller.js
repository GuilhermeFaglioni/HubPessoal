import * as taskService from './tasks.service.js';
export const creatTask = async (req, res) => {
    try {
        const taskData = req.body;
        const newTask = await taskService.createTask(taskData);
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const listAllTasksByUserId = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            throw new Error('ID do usuário não encontrado');
        }
        const tasksList = await taskService.listAllTasksByUserId(userId.toString());
        res.status(200).json(tasksList);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateTask = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            throw new Error('Dados não enviados');
        }
        const taskUpdate = await taskService.updateTask(data);
        res.status(200).json(taskUpdate);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const toggleTask = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        if (!userId || !taskId) {
            throw new Error('IDs não encontrados');
        }
        const toggleCompletion = await taskService.toggleCompletion(userId, taskId);
        res.status(200).json(toggleCompletion);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const toggleAllActive = async (req, res) => {
    try {
        const { areaId, userId } = req.params;
        if (!userId || !areaId) {
            throw new Error('IDs não encontrados');
        }
        const toggleActive = await taskService.toggleAllActive(userId, areaId);
        res.status(200).json(toggleActive);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteTask = async (req, res) => {
    try {
        const { taskId, userId } = req.params;
        if (!userId || !taskId) {
            throw new Error('IDs não encontrados');
        }
        const deleteTask = await taskService.deleteTask(userId.toString(), taskId.toString());
        res.status(200).json(deleteTask);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
