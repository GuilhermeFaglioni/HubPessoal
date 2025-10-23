import type { Task } from './TaskTypes'

export interface area {
  emoji: string
  id: string
  name: string
}

export interface AreaWithTasks {
  id: string
  name: string
  emoji?: string
  user_id: string
  Tasks?: Task[]
}

export interface AreaEmoji {
  id: string
  emoji: string | null
}
