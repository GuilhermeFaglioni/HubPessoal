import * as areaService from './area.service.js';
export const createAreas = async (req, res) => {
    try {
        const areaData = req.body;
        const newAreas = await areaService.createAreas(areaData);
        res.status(201).json(newAreas);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const createArea = async (req, res) => {
    try {
        const areaData = req.body;
        const newArea = await areaService.createArea(areaData);
        res.status(201).json(newArea);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateArea = async (req, res) => {
    try {
        const areaData = req.body;
        const updatedArea = await areaService.updateArea(areaData);
        res.status(200).json(updatedArea);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const deleteArea = async (req, res) => {
    try {
        const { areaId, userId } = req.params;
        if (!areaId || !userId) {
            throw new Error('ID da área ou do usuário não fornecido');
        }
        if (typeof areaId !== 'string' || typeof userId !== 'string') {
            throw new Error('ID da área ou do usuário inválido');
        }
        const deletedArea = await areaService.deleteArea(areaId, userId);
        res.status(200).json(deletedArea);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getAreasByUserId = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            throw new Error('ID do usuário não fornecido');
        }
        const getAreas = await areaService.listAreasByUserId(userId.toString());
        res.status(200).json(getAreas);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const getAreasWithTasks = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId) {
            throw new Error('ID do usuário não fornecido');
        }
        const getAreasWithTasks = await areaService.tasksWithArea(userId.toString());
        res.status(200).json(getAreasWithTasks);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
