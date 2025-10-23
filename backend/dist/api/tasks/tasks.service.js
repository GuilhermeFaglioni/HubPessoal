import prisma from "../../lib/prisma.js";
export const createTask = async (taskData) => {
    const area = await prisma.area.findUnique({
        where: {
            id: taskData.areaId,
        },
    });
    if (!area) {
        throw new Error("Área não encontrada");
    }
    const newTask = await prisma.task.create({
        data: {
            user_id: area.user_id,
            area_id: taskData.areaId,
            title: taskData.title,
            subject_id: taskData.subjectId || null,
            description: taskData.description || null,
            due_date: taskData.due_date || null,
            is_completed: false,
        },
    });
    return newTask;
};
export const listAllTasksByUserId = async (userId) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!existingUser) {
        throw new Error("Usuário não encontrado");
    }
    const tasks = await prisma.task.findMany({
        where: {
            user_id: userId,
        },
    });
    return tasks;
};
export const updateTask = async (taskData) => {
    const existingTask = await prisma.task.findUnique({
        where: {
            id: taskData.id,
            user_id: taskData.userId,
        },
    });
    if (!existingTask) {
        throw new Error("Task não encontrada");
    }
    const updatedTask = await prisma.task.update({
        where: {
            user_id: existingTask.user_id,
            id: existingTask.id,
        },
        data: {
            area_id: taskData.areaId || existingTask.area_id,
            title: taskData.title || existingTask.title,
            subject_id: taskData.subjectId || existingTask.subject_id,
            description: taskData.description || existingTask.description,
            due_date: taskData.due_date || existingTask.due_date,
        },
    });
    return updatedTask;
};
export const toggleCompletion = async (userId, taskId) => {
    const existingTask = await prisma.task.findUnique({
        where: {
            id: taskId,
            user_id: userId,
        },
    });
    if (!existingTask) {
        throw new Error("Task não encontrada");
    }
    const toggleTask = await prisma.task.update({
        where: {
            user_id: existingTask.user_id,
            id: existingTask.id,
        },
        data: {
            is_completed: !existingTask.is_completed,
        },
    });
    return toggleTask;
};
export const deleteTask = async (userId, taskId) => {
    const existingTask = await prisma.task.findUnique({
        where: {
            id: taskId,
            user_id: userId,
        },
    });
    if (!existingTask) {
        throw new Error("Task não encontrada");
    }
    await prisma.task.delete({
        where: {
            user_id: userId,
            id: taskId
        }
    });
    return { message: 'Task deletado com sucesso' };
};
export const toggleAllActive = async (userId, areaId) => {
    const existingUser = await prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    if (!existingUser) {
        throw new Error("Usuário não encontrado");
    }
    const updatedTasks = await prisma.task.updateMany({
        where: {
            area_id: areaId,
            is_completed: true,
            is_active: true,
        },
        data: {
            is_active: false
        }
    });
    return updatedTasks;
};
