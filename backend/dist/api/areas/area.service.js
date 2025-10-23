import prisma from "../../lib/prisma.js";
export const createAreas = async (areaData) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const newAreas = await prisma.area.createMany({
        data: areaData.name.map((name) => ({
            user_id: areaData.userId,
            name,
            emoji: areaData.emoji || null
        }))
    });
    return newAreas;
};
export const createArea = async (areaData) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const newArea = await prisma.area.create({
        data: {
            user_id: areaData.userId,
            name: areaData.name,
            emoji: areaData.emoji || null
        }
    });
    return newArea;
};
export const updateArea = async (areaData) => {
    const user = await prisma.user.findUnique({
        where: {
            id: areaData.userId
        }
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    const area = await prisma.area.findUnique({
        where: {
            user_id: areaData.userId,
            id: areaData.areaId
        }
    });
    if (!area) {
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
    });
    return updatedArea;
};
export const deleteArea = async (areaId, userId) => {
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!user) {
        throw new Error('Usuário não encontrado');
    }
    await prisma.area.delete({
        where: {
            user_id: userId,
            id: areaId
        }
    });
    return { message: 'Área deletada com sucesso' };
};
export const listAreasByUserId = async (userId) => {
    const areas = await prisma.area.findMany({
        where: {
            user_id: userId
        }
    });
    if (!areas) {
        throw new Error('Nenhuma área encontrada');
    }
    return areas;
};
export const tasksWithArea = async (userId) => {
    const areas = await prisma.area.findMany({
        where: {
            user_id: userId
        },
        include: {
            Tasks: {
                where: {
                    is_active: true
                }
            }
        }
    });
    if (!areas) {
        throw new Error('Areas ou tasks não encontradas');
    }
    return areas;
};
