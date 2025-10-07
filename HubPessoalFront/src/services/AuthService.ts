import api from '@/api/api'
import paths from '@/api/paths'

interface ILoginData {
  email: string
  password: string
}

interface IRegisterData {
  full_name: string
  email: string
  password: string
}

export async function login(data: ILoginData) {
  try {
    const response = await api.post(paths.login, data)
    return response.data
  } catch (error) {
    throw error
  }
}

export async function register(data: IRegisterData) {
  try {
    const response = await api.post(paths.register, data)
    return response.data
  } catch (error) {
    throw error
  }
}
