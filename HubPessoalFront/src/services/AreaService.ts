import api from '@/api/api'
import paths from '@/api/paths'

interface IAreasData {
  userId: string
  name: string[]
}

interface IAreaData {
  userId: string
  name: string
  emoji?: string
}

interface IUpdateAreaData {
  userId: string
  areaId: string
  name?: string
  emoji?: string
}

export async function createAreas(data: IAreasData) {
  try {
    const response = await api.post(paths.createAreas, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function createArea(data: IAreaData) {
  try {
    const response = await api.post(paths.createArea, {
      userId: data.userId,
      name: data.name,
      emoji: data.emoji || null,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateArea(data: IUpdateAreaData) {
  try {
    const response = await api.put(paths.updateArea, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getAreas(userId: string) {
  try {
    const response = await api.get(paths.getAreas, {
      params: { userId },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getAreasWithTasks(userId: string) {
  try {
    const response = await api.get(paths.getAreasWithTasks, {
      params: { userId },
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteArea(userId: string, areaId: string) {
  try {
    const url = `${paths.deleteArea}/${userId}/${areaId}`
    const response = await api.delete(url)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function getEmojiHash(userId: string) {
  try {
    const response = await api.get(paths.getEmojiHashMap, { params: { userId } })

    return response.data
  } catch (error) {
    throw error
  }
}
