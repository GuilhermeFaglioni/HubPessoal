import { Request, Response } from "express";

import * as taskService from './tasks.service.js';

export const creatTask = async (req: Request, res: Response) => {
    try {
        const taskData = req.body;

        const newTask = await taskService.createTask(taskData);

        res.status(201).json(newTask);
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

export const listAllTasksByUserId = async (req: Request, res: Response) => {
    try {
        const userId = req.query.userId;

        if(!userId) {
            throw new Error('ID do usuário não encontrado')
        }

        const tasksList = await taskService.listAllTasksByUserId(userId.toString())

        res.status(200).json(tasksList)
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const updateTask = async (req: Request, res: Response) => {
    try {
        const data = req.body;

        if(!data) {
            throw new Error('Dados não enviados')
        }

        const taskUpdate = await taskService.updateTask(data)

        res.status(200).json(taskUpdate)
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

export const toggleTask = async(req: Request, res: Response) => {
    try {
        const {taskId, userId} = req.params

        if(!userId || !taskId) {
            throw new Error('IDs não encontrados')
        }

        const toggleCompletion = await taskService.toggleCompletion(userId.toString(), taskId.toString())

        res.status(200).json(toggleCompletion)
    } catch(error: any) {
        res.status(400).json({message: error.message})
    }
}

export const deleteTask = async(req: Request, res: Response) => {
    try {
        const {taskId, userId} = req.params

        if(!userId || !taskId) {
            throw new Error('IDs não encontrados')
        }

        const deleteTask = await taskService.deleteTask(userId.toString(), taskId.toString())

        res.status(200).json(deleteTask)
    } catch(error:any) {
        res.status(400).json({message: error.message})
    }
}
