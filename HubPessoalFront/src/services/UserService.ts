import api from '@/api/api'
import paths from '@/api/paths'

interface IGetUserData {
  userId: string
}

export async function getUser(data: IGetUserData) {
  try {
    const response = await api.get(paths.getUser, { params: data })

    return response.data
  } catch (error) {
    throw error
  }
}
