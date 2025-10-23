<template>
  <v-container fluid>
    <v-card class="pa-5">
      <v-card-text>
        <v-form @submit.prevent="handleUpdateTask">
          <v-text-field
            v-model="title"
            label="*Nome da tarefa"
            name="title"
            prepend-inner-icon="mdi-rename-outline"
            type="text"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            v-model="description"
            label="Descrição"
            name="description"
            auto-grow
            rows="2"
            prepend-inner-icon="mdi-text"
            type="text"
            variant="outlined"
          ></v-textarea>
          <div class="d-flex ga-4">
            <v-menu
              v-model="isMenuOpen"
              :close-on-content-click="false"
              transition="scale-transition"
            >
              <template v-slot:activator="{ props }">
                <v-text-field
                  :model-value="formattedDate"
                  label="Data de Conclusão"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  variant="outlined"
                  v-bind="props"
                ></v-text-field>
              </template>

              <v-date-picker
                v-model="dueDate"
                title="Selecione a data"
                color="primary"
                @update:modelValue="isMenuOpen = false"
              ></v-date-picker>
            </v-menu>
            <v-autocomplete
              v-model="selectedAreaId"
              :items="areasList"
              :loading="isLoading"
              pre
              item-title="name"
              item-value="id"
              label="*Area"
              variant="outlined"
              placeholder="Digite para buscar..."
              width="30%"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props">
                  <template v-slot:prepend>
                    <span class="text-h6 me-3">{{ item.raw.emoji }}</span>
                  </template>
                </v-list-item>
              </template>

              <template v-slot:selection="{ item }">
                <div class="d-flex align-center">
                  <span class="text-h6 me-2">{{ item.raw.emoji }}</span>
                  <span>{{ item.raw.name }}</span>
                </div>
              </template>
            </v-autocomplete>
          </div>
          <v-card-actions class="d-flex justify-center">
            <v-btn
              class="px-10 text-white font-weight-bold"
              type="submit"
              variant="elevated"
              color="#267BFF"
              size="large"
            >
              Salvar
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { area } from '@/types/AreasTypes'
import { getAreas } from '@/services/AreaService'
import { updateTask } from '@/services/TaskService'

const props = defineProps<{
  titleProp: string
  descriptionProp?: string
  dueDateProp?: Date | null
  selectedAreaIdProp: string
  taskId: string
}>()

const title = ref(props.titleProp || '')
const description = ref(props.descriptionProp || '')
const dueDate = ref<Date | null>(props.dueDateProp || null)
const isMenuOpen = ref(false)
const areasList = ref<area[]>()
const isLoading = ref(false)
const selectedAreaId = ref<string>(props.selectedAreaIdProp)

const emit = defineEmits(['closeModal'])
const isSaving = ref(false)

const formattedDate = computed(() => {
  return dueDate.value ? dueDate.value.toLocaleDateString('pt-BR') : ''
})

async function handleUpdateTask() {
  const userId = localStorage.getItem('userId')
  console.log(userId)
  console.log(props.taskId)
  if (!userId) return
  if (!props.taskId) return

  isSaving.value = true
  const isoDueDate = dueDate.value ? dueDate.value.toISOString() : undefined

  const payload = {
    title: title.value,
    description: description.value || undefined,
    due_date: isoDueDate || undefined,
    areaId: selectedAreaId.value,
    userId: userId,
    id: props.taskId,
  }

  try {
    await updateTask(payload)
    emit('closeModal')
  } catch (error) {
    console.error('Erro ao criar a tarefa:', error)
  } finally {
    isSaving.value = false
  }
}

async function listAreas() {
  const userId = localStorage.getItem('userId')
  if (!userId) return

  try {
    isLoading.value = true
    areasList.value = await getAreas(userId)
  } catch {
    console.log('Erro de carregamento')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  listAreas()
})
</script>
<style lang="css" scoped></style>
