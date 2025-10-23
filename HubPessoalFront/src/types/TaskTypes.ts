export interface Task {
  id: string
  title: string
  description?: string | null
  due_date?: string | null
  is_completed: boolean
  area_id?: string
  subject_id?: string | null
  user_id: string
}

export interface CategorizedTasksResponse {
  findTodayTasks: Task[]
  findTomorrowTasks: Task[]
  findTasksWithoutDate: Task[]
}
