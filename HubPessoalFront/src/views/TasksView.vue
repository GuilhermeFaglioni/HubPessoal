<template>
  <v-container class="height-screen d-flex flex-column" fluid>
    <h1 class="text-center animated-title">Gerencie suas tarefas</h1>
    <v-container></v-container>
    <v-tabs v-model="tab" color="#267bff">
      <v-tab value="area">Por Área</v-tab>
      <v-tab value="todo">Todo List</v-tab>
    </v-tabs>
    <div class="d-flex justify-end w-100 px-8">
      <v-dialog v-model="isModalOpen" max-width="600">
        <template v-slot:activator="{ props: activatorProps }">
          <v-btn
            v-bind="activatorProps"
            class="text-none font-weight-semibold"
            size="large"
            width="200"
            append-icon="mdi-plus"
            text="Criar nova tarefa"
            variant="tonal"
            color="#267bff"
          ></v-btn>
        </template>

        <TasksModal @closeModal="onTaskSaved" />
      </v-dialog>
    </div>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="area">
        <TasksByArea ref="taskByArea" />
      </v-tabs-window-item>
      <v-tabs-window-item value="todo">
        <TodoList />
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>
<script setup lang="ts">
import TasksByArea from '@/components/TasksByArea.vue'
import TasksModal from '@/components/TasksModal.vue'
import TodoList from '@/components/TodoList.vue'
import { ref } from 'vue'
const isModalOpen = ref(false)

const tab = ref('')

const taskByArea = ref<InstanceType<typeof TasksByArea> | null>(null)

async function onTaskSaved() {
  isModalOpen.value = false
  if (taskByArea.value) {
    await taskByArea.value.refresh()
  }
}
</script>
<style lang="css" scoped>
.animated-title {
  font-size: 2.5rem;
  color: #212121;
  background-image: linear-gradient(to left, #212121 50%, #267bff 50%);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: color-wipe 1.5s ease-out forwards;
}

@keyframes color-wipe {
  from {
    background-position: 100% 0;
  }
  to {
    background-position: 0 0;
  }
}
</style>
