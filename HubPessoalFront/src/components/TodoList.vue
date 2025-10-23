<template>
  <v-container width="100vw">
    <div class="d-flex align-center ga-8 justify-center">
      <v-card width="20rem">
        <div class="d-flex align-center ga-4 px-4 py-1">
          <span>⚡</span>
          <h2>Hoje</h2>
        </div>
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item v-for="task in todoListTasks.findTodayTasks" :key="task.id">
            <div class="d-flex justify-space-between">
              <p>{{ task.title }}</p>
              <p>{{ emojiMap[task.area_id!] }}</p>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card width="20rem">
        <div class="d-flex align-center ga-4 px-4 py-1">
          <span>⏭️</span>
          <h2>Amanhã</h2>
        </div>
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item v-for="task in todoListTasks.findTomorrowTasks" :key="task.id">
            <div class="d-flex justify-space-between">
              <p>{{ task.title }}</p>
              <p>{{ emojiMap[task.area_id!] }}</p>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
      <v-card width="20rem">
        <div class="d-flex align-center ga-4 px-4 py-1">
          <span>📋</span>
          <h2>outros</h2>
        </div>
        <v-divider></v-divider>
        <v-list density="compact">
          <v-list-item v-for="task in todoListTasks.findTasksWithoutDate" :key="task.id">
            <div class="d-flex justify-space-between">
              <p>{{ task.title }}</p>
              <p>{{ emojiMap[task.area_id!] }}</p>
            </div>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-container>
</template>
<script setup lang="ts">
import { getEmojiHash } from '@/services/AreaService'
import { getTodoTasks } from '@/services/TaskService'
import type { AreaEmoji } from '@/types/AreasTypes'
import type { CategorizedTasksResponse } from '@/types/TaskTypes'
import { computed, onMounted, ref } from 'vue'
const todoListTasks = ref<CategorizedTasksResponse>({
  findTodayTasks: [],
  findTomorrowTasks: [],
  findTasksWithoutDate: [],
})

const emojiHashMap = ref<AreaEmoji[]>([])

async function getTodoList() {
  const userId = localStorage.getItem('userId')

  if (!userId) return

  todoListTasks.value = await getTodoTasks(userId)
}

async function getEmojiHashMap() {
  const userId = localStorage.getItem('userId')

  if (!userId) return

  emojiHashMap.value = await getEmojiHash(userId)
}

const emojiMap = computed(() => {
  if (!emojiHashMap.value) {
    return {}
  }

  return emojiHashMap.value.reduce(
    (map, area) => {
      map[area.id] = area.emoji
      return map
    },
    {} as Record<string, string | null>,
  )
})

onMounted(() => {
  getTodoList()
  getEmojiHashMap()
})
</script>
<style lang="css" scoped></style>
