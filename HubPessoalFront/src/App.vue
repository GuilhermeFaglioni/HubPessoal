<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

function redirectMenu(id: number) {
  const menu = [
    { id: 0, name: 'home' },
    { id: 1, name: 'areas' },
    { id: 2, name: 'tasks' },
  ]
  router.push({ name: menu[id]?.name })
}

function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  router.push({ name: 'login' })
}
</script>

<template>
  <v-app>
    <v-navigation-drawer width="200" expand-on-hover permanent rail v-if="!route.meta.hideLayout">
      <v-list-item @click="redirectMenu(0)" class="px-2">
        <div class="d-flex align-center">
          <v-icon class="ml-2">mdi-menu</v-icon>
          <v-list-item-title class="font-weight-bold text-subtitle-1 ml-4">
            HubPessoal
          </v-list-item-title>
        </div>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item @click="redirectMenu(1)" class="px-2">
        <div class="d-flex align-center">
          <v-icon class="ml-2">mdi-layers</v-icon>
          <v-list-item-title class="font-weight-bold text-subtitle-1 ml-4">
            Areas
          </v-list-item-title>
        </div>
      </v-list-item>
      <v-list-item @click="redirectMenu(2)" class="px-2">
        <div class="d-flex align-center">
          <v-icon class="ml-2">mdi-format-list-checks</v-icon>
          <v-list-item-title class="font-weight-bold text-subtitle-1 ml-4">
            Tarefas
          </v-list-item-title>
        </div>
      </v-list-item>
      <template v-slot:append>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
          class="mb-4"
        ></v-list-item>
      </template>
    </v-navigation-drawer>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
