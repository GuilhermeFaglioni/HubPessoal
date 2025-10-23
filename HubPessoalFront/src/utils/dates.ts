import { format, isPast } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const formattedDate = (dateString: string | null | undefined): string => {
  if (!dateString) {
    return ''
  }

  try {
    const date = new Date(dateString)
    return format(date, 'dd/MM/yyyy', { locale: ptBR })
  } catch (error) {
    console.error('Data invalida para formatação: ', dateString, error)
    return 'Data inválida'
  }
}

export const isDateOverdue = (dateString: string | null | undefined) => {
  if (!dateString) {
    return false
  }

  try {
    const date = new Date(dateString)
    return isPast(date)
  } catch (error) {
    console.log(error)
    return false
  }
}
