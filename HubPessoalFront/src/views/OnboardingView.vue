<template>
  <v-container class="height-screen">
    <h2 class="text-center">Vamos dar seus primeiros passos para se organizar</h2>
    <v-card width="100%" max-width="40rem" class="px-4 mt-12 card-with-sidebar" height="auto">
      <v-card-title>Aqui vamos criar as áreas da sua vida</v-card-title>
      <v-card-text>Alguns exemplos são faculdade, vida pessoal, trabalho etc...</v-card-text>
      <v-card-text>
        <v-form @submit.prevent="addItems">
          <div class="d-flex align-center ga-10 mb-4">
            <v-text-field
              v-model="area"
              label="Crie sua área"
              name="area"
              prepend-inner-icon="mdi-bookshelf"
              type="text"
              variant="outlined"
              hide-details
            >
            </v-text-field>
            <v-btn
              type="submit"
              class="text-white font-weight-bold"
              color="#267bff"
              size="large"
              variant="elevated"
              :disabled="!area"
            >
              Adicionar +
            </v-btn>
          </div>
        </v-form>
        <div v-if="areasList.length > 0">
          <h3>Áreas:</h3>
          <v-list lines="one">
            <v-list-item v-for="(item, index) in areasList" :key="index" :title="item">
              <template v-slot:prepend>
                <v-icon color="primary">mdi-bookshelf</v-icon>
              </template>
              <template v-slot:append>
                <v-btn icon variant="text" @click="removeItem(index)">
                  <v-icon color="red">mdi-close</v-icon>
                </v-btn>
              </template>
            </v-list-item>
          </v-list>
        </div>
        <v-btn
          @click="finishOnboarding"
          class="text-white font-weight-bold"
          color="#267bff"
          size="large"
          variant="elevated"
          :disabled="!areasList.length"
        >
          salvar
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createAreas } from '@/services/AreaService'
import { concludeOnboarding } from '@/services/OnboardingService'
import { useRouter } from 'vue-router'
const area = ref('')
const areasList = ref<string[]>([])
const router = useRouter()

function addItems() {
  const trimmedArea = area.value.trim()
  if (trimmedArea && !areasList.value.includes(trimmedArea)) {
    areasList.value.push(trimmedArea)
    area.value = ''
  }
}

function removeItem(index: number) {
  areasList.value.splice(index, 1)
}

async function finishOnboarding() {
  const userId = localStorage.getItem('userId')
  if (!userId) return
  try {
    await saveAreas(userId, areasList.value)
    await concludeOnboarding(userId)
    router.push({ name: 'home' })
  } catch (error) {
    console.error('Failed to conclude onboarding:', error)
  }
}

async function saveAreas(userId?: string, name?: string[]) {
  if (!userId) return
  if (!name) return
  try {
    const responseData = await createAreas({ userId, name: name })
    return responseData
  } catch (error) {
    console.error('Failed to create areas:', error)
  }
}
</script>

<style scoped>
.height-screen {
  min-height: 100vh;
  min-width: 100vw;
  align-items: center;
  justify-items: center;
}

.card-with-sidebar {
  position: relative;
  overflow: hidden;
}

.card-with-sidebar::before {
  content: '';

  position: absolute;
  top: 0;
  left: 0;

  width: 5px;
  height: 100%;
  background-color: #267bff;
}
</style>
