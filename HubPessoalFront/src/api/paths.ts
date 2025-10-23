const paths = {
  //users
  login: '/users/login',
  register: '/users/register',
  getUser: '/users/',
  concludeOnboarding: '/users/concludeOnboarding',

  //areas
  createAreas: '/areas/createAreas',
  createArea: '/areas/createArea',
  getAreas: '/areas/getAreasByUserId',
  updateArea: '/areas/updateArea',
  deleteArea: '/areas/deleteArea',
  getAreasWithTasks: '/areas/getAreasWithTasks',
  getEmojiHashMap: '/areas/getEmojiHash',

  //tasks
  createTask: '/tasks/createTask',
  toggleTask: '/toggle',
  toggleAllActive: '/toggleAllActive',
  updateTasks: '/tasks/updateTask',
  deleteTask: '/tasks/deleteTask/',
  todoTasks: '/tasks/getTodoListTasks',
}

export default paths
