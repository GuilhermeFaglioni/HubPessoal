import {Request, Response} from "express";

import * as areaService from './area.service.js';

export const createAreas = async (req: Request, res: Response) => {
    try {
        const areaData = req.body;
        
        const newAreas = await areaService.createAreas(areaData);

        res.status(201).json(newAreas);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const createArea = async (req: Request, res: Response) => {
    try {
        const areaData = req.body;
        
        const newArea = await areaService.createArea(areaData);

        res.status(201).json(newArea);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const updateArea = async (req: Request, res: Response) => {
    try {
        const areaData = req.body;

        const updatedArea = await areaService.updateArea(areaData);

        res.status(200).json(updatedArea);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const deleteArea = async (req: Request, res: Response) => {
    try {
        const areaData = req.body;

        const deletedArea = await areaService.deleteArea(areaData);

        res.status(200).json(deletedArea);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const getAreasByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;

        if(!userId) {
            throw new Error('ID do usuário não fornecido');
        }

        const getAreas = await areaService.listAreasByUserId(userId.toString());

        res.status(200).json(getAreas);
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}