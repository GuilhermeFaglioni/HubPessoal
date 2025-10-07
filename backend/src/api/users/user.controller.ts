import { Request, Response } from "express";

import * as userService from './user.service.js';

export const register = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const newUser = await userService.createUser(userData);

        res.status(201).json(newUser);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const userData = req.body;

        const authenticatedUser = await userService.authUser(userData);

        res.status(200).json(authenticatedUser);
    } catch (error: any) {
        res.status(401).json({message: error.message})
    }
}


export const getUserById = async(req: Request, res: Response) => {
    try {
        const userData = req.query.userId;

        if(!userData) {
            throw new Error('ID do usuário não fornecido');
        }

        const user = await userService.getUserById(userData.toString());

        res.status(200).json(user);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}

export const concludeOnboarding = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body;
        const updatedUser = await userService.concludeOnboarding(userId.userId);

        res.status(200).json(updatedUser);
    } catch (error: any) {
        res.status(400).json({message: error.message})
    }
}