import api from '@/api/api'
import paths from '@/api/paths'

export async function concludeOnboarding(userId: string) {
  try {
    const response = await api.post(paths.concludeOnboarding, { userId: userId })
    return response.data
  } catch (error) {
    throw error
  }
}
