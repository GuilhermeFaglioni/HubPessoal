import prisma from "../../lib/prisma.js";

interface createAreasDataType {
    userId: string;
    name: [string];
    emoji?: string;
}

interface createAreaDataType {
    userId: string;
    name: string;
    emoji?: string;
}

interface updateDataType {
    areaId: string;
    userId: string;
    name?: string;
    emoji?: string;
}

interface deleteDataType {
    areaId: string;
    userId: string;
}

export const createAreas = async(areaData: createAreasDataType) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    })

    if(!user) {
        throw new Error('Usuário não encontrado')
    }

    const newAreas = await prisma.area.createMany({
        data: areaData.name.map((name) => ({
            user_id: areaData.userId,
            name,
            emoji: areaData.emoji || null
        }))
    })

    return newAreas;
}

export const createArea = async(areaData: createAreaDataType) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    })

    if(!user) {
        throw new Error('Usuário não encontrado')
    }

    const newArea = await prisma.area.create({
        data: {
            user_id: areaData.userId,
            name: areaData.name,
            emoji: areaData.emoji || null
        }
    })

    return newArea;
}

export const updateArea = async(areaData: updateDataType) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    })

    if(!user) {
        throw new Error('Usuário não encontrado');
    }

    const area = await prisma.area.findUnique({
        where: {
            user_id: areaData.userId,
            id: areaData.areaId
        }
    })

    if(!area) {
        throw new Error('Área não encontrada');
    }

    const updatedArea = await prisma.area.update({
        where: {
            id: areaData.areaId
        },
        data: {
            name: areaData.name || area.name,
            emoji: areaData.emoji || area.emoji
        }
    })

    return updatedArea;
}

export const deleteArea = async(areaData: deleteDataType) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    })

    if(!user) {
        throw new Error('Usuário não encontrado');
    }

    const area = await prisma.area.findUnique({
        where: {
            user_id: areaData.userId,
            id: areaData.areaId
        }
    })

    if(!area) {
        throw new Error('Área não encontrada');
    }

    await prisma.area.delete({
        where: {
            user_id: areaData.userId,
            id: areaData.areaId
        }
    })

    return {message: 'Área deletada com sucesso'};
}

export const listAreasByUserId = async(userId: string) => {
    const areas = await prisma.area.findMany({
        where: {
            user_id: userId
        }
    })

    if(!areas) {
        throw new Error('Nenhuma área encontrada');
    }

    return areas;
}