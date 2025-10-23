<template>
  <v-container>
    <v-row>
      <v-col v-for="area in areasList" :key="area.id" cols="12" md="6" lg="4">
        <v-card>
          <div class="d-flex align-center justify-space-between">
            <div class="d-flex align-center ml-4">
              <span class="text-h4">{{ area.emoji }}</span>
              <v-card-title>
                {{ area.name }}
              </v-card-title>
            </div>
            <v-btn
              class="text-none font-weight-semibold mr-4"
              @click="toggleAllActiveByArea(area.id)"
              size="small"
              width="150"
              append-icon="mdi-refresh"
              text="Limpar completos"
              variant="tonal"
              color="#666666"
            ></v-btn>
          </div>

          <v-divider></v-divider>

          <v-list density="compact">
            <v-list-item v-for="task in area.Tasks" :key="task.id">
              <template v-slot:prepend>
                <v-checkbox-btn
                  @click="toggleTaskComplete(task.id)"
                  :model-value="task.is_completed"
                ></v-checkbox-btn>
              </template>
              <div
                class="d-flex justify-space-between"
                @click="
                  openModal(task.title, task.description!, task.due_date!, task.area_id!, task.id)
                "
              >
                <div>
                  <v-list-item class="pa-0">
                    {{ task.title }}
                  </v-list-item>
                </div>
                <div>
                  <v-list-item
                    v-if="task.due_date"
                    class="text-button"
                    :class="{
                      'text-white bg-red font-weight-bold rounded-pill pa-0 px-2': isDateOverdue(
                        task.due_date,
                      ),
                      'text-white bg-green font-weight-bold rounded-pill pa-0 px-2': !isDateOverdue(
                        task.due_date,
                      ),
                    }"
                  >
                    {{ formattedDate(task.due_date) }}
                  </v-list-item>
                </div>
              </div>
              <template v-slot:append>
                <v-btn
                  icon="mdi-trash-can"
                  @click="handleDeleteTask(task.id)"
                  variant="plain"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="toggleModal" max-width="600px">
      <EditTasksModal
        v-if="toggleModal"
        :title-prop="selectedTask.title"
        :description-prop="selectedTask.description!"
        :due-date-prop="selectedTask.due_date ? new Date(selectedTask.due_date) : new Date()"
        :selected-area-id-prop="selectedTask.selectedAreaId!"
        :task-id="selectedTask.taskId"
        @close-modal="onModalclose"
      />
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import EditTasksModal from './EditTasksModal.vue'
import type { AreaWithTasks } from '@/types/AreasTypes'
import { getAreasWithTasks } from '@/services/AreaService'
import { deleteTask, toggleAllActive, toggleTask } from '@/services/TaskService'
import { formattedDate, isDateOverdue } from '@/utils/dates'

const areasList = ref<AreaWithTasks[]>()
const toggleModal = ref(false)
const selectedTask = ref({
  title: '',
  description: '',
  due_date: '',
  selectedAreaId: '',
  taskId: '',
})

function openModal(
  title: string,
  description: string,
  due_date: string,
  selectedAreaId: string,
  taskId: string,
) {
  selectedTask.value = {
    title,
    description,
    due_date,
    selectedAreaId,
    taskId,
  }
  toggleModal.value = true
}

async function onModalclose() {
  toggleModal.value = false
  await listAreas()
}

async function listAreas() {
  const userId = localStorage.getItem('userId')
  if (!userId) return

  try {
    areasList.value = await getAreasWithTasks(userId)
  } catch {
    console.log('Erro de carregamento')
  }
}

async function handleDeleteTask(taskId: string) {
  if (!taskId) return
  try {
    await deleteTask(taskId)
    await listAreas()
  } catch (error) {
    console.error('Erro: ', error)
  }
}

async function toggleTaskComplete(taskId: string) {
  const userId = localStorage.getItem('userId')
  if (!userId) return

  try {
    await toggleTask(taskId, userId)
  } catch {
    console.log('Toggle failed')
  } finally {
  }
}

async function toggleAllActiveByArea(areaId: string) {
  const userId = localStorage.getItem('userId')
  if (!userId) return

  try {
    await toggleAllActive(areaId, userId)
  } catch {
    console.log('Toggle Failed')
  } finally {
    await listAreas()
  }
}

defineExpose({
  refresh: listAreas,
})

onMounted(() => {
  listAreas()
})
</script>

<style lang="css" scoped></style>
