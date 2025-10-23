import api from '@/api/api'
import paths from '@/api/paths'

interface ICreateTask {
  title: string
  description?: string
  dueDate?: string
  areaId: string
  userId: string
}

interface IUpdateTask {
  title: string
  description?: string
  dueDate?: string
  areaId: string
  userId: string
  id: string
}

export async function createTask(data: ICreateTask) {
  try {
    const response = await api.post(paths.createTask, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getTodoTasks(userId: string) {
  try {
    const response = await api.get(paths.todoTasks, { params: { userId } })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function toggleTask(taskId: string, userId: string) {
  const finalUrl = `tasks/${taskId}/${userId}${paths.toggleTask}`
  try {
    const response = await api.patch(finalUrl)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function toggleAllActive(areaId: string, userId: string) {
  const finalUrl = `tasks/${areaId}/${userId}${paths.toggleAllActive}`

  try {
    const response = await api.put(finalUrl)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateTask(data: IUpdateTask) {
  try {
    const response = await api.put(paths.updateTasks, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteTask(taskId: string) {
  try {
    const response = await api.delete(paths.deleteTask + taskId)
    return response
  } catch (error) {
    throw error
  }
}
