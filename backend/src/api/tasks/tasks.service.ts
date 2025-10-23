import prisma from "../../lib/prisma.js";
import { startOfDay, addDays } from "date-fns";

interface ICreateTaskData {
  userId: string;
  areaId: string;
  title: string;
  subjectId?: string;
  description?: string;
  due_date?: Date;
}

interface IUpdateTaskData {
  userId: string;
  id: string;
  areaId?: string;
  title?: string;
  subjectId?: string;
  description?: string;
  due_date?: Date;
}

export const createTask = async (taskData: ICreateTaskData) => {
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

export const listAllTasksByUserId = async (userId: string) => {
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

export const updateTask = async (taskData: IUpdateTaskData) => {
  const existingTask = await prisma.task.findFirst({
    where: {
      id: taskData.id,
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

export const toggleCompletion = async (userId: string, taskId: string) => {
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

export const deleteTask = async (taskId: string) => {
  const existingTask = await prisma.task.findUnique({
    where: {
      id: taskId,
    },
  });

  if (!existingTask) {
    throw new Error("Task não encontrada");
  }

  await prisma.task.delete({
    where: {
        user_id: existingTask.user_id,
        id: existingTask.id
    }
  })

  return {message: 'Task deletado com sucesso'}
};

export const toggleAllActive = async(userId: string, areaId: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if(!existingUser) {
    throw new Error ("Usuário não encontrado")
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
  })

  return updatedTasks
}

export const getTasksByDate = async(userId: string) => {
  const today = new Date();
  const todayInit = startOfDay(today);
  const tomorrowInit = startOfDay(addDays(today, 1))
  const existingUser = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if(!existingUser) {
    throw new Error ("Usuário não encontrado");
  }

  const findTodayTasks = await prisma.task.findMany({
    where: {
      is_completed: false,
      due_date: {
        gte: todayInit,
        lt: tomorrowInit
      }
    },
    orderBy: {
      due_date: 'desc'
    }
  })

  const tomorrowFinish = startOfDay(addDays(today, 2))

  const findTomorrowTasks = await prisma.task.findMany({
    where: {
      is_completed: false,
      due_date: {
        gte: tomorrowInit,
        lt: tomorrowFinish
      }
    },
    orderBy: {
      due_date: 'desc'
    }
  })

  const findTasksWithoutDate = await prisma.task.findMany({
    where: {
      is_completed: false,
      due_date: null
    }
  })

  const returnObject = {
    findTodayTasks,
    findTomorrowTasks,
    findTasksWithoutDate
  }

  return returnObject
}