<template>
  <v-container class="height-screen" fluid>
    <h1 class="text-center animated-title">Bem vindo {{ name }}!</h1>
    <v-btn color="primary" @click="logout">Logout</v-btn>
    <v-row class="fill-height">
      <v-col class="text-center d-flex align-center justify-center">
        <v-card width="30%">
          <h2 class="mt-5">Áreas da sua vida</h2>
          <div v-if="areas != null">
            <v-list lines="one">
              <v-list-item
                class="mb-2"
                v-for="(item, index) in areas"
                :key="index"
                :title="item.name"
              >
                <template v-slot:prepend>
                  <span class="text-h4">{{ item.emoji }}</span>
                </template>
                <template v-slot:append>
                  <div class="d-flex flex-column align-center">
                    <v-btn
                      @click="editItem(index)"
                      variant="plain"
                      :icon="itemEdited === index ? 'mdi-close' : 'mdi-square-edit-outline'"
                    ></v-btn>
                    <v-btn
                      v-if="itemEdited === index"
                      @click="saveItem(item.id)"
                      variant="plain"
                      class="ml-2"
                      icon="mdi-content-save-outline"
                    >
                    </v-btn>
                  </div>
                </template>
                <v-expand-transition>
                  <div v-if="itemEdited === index">
                    <v-form @submit.prevent="saveItem(item.id)" class="px-4 py-2">
                      <v-text-field
                        v-model="item.name"
                        label="Editar nome da área"
                        name="area"
                        prepend-inner-icon="mdi-bookshelf"
                        type="text"
                        variant="outlined"
                        class="mb-4"
                        hide-details
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="selectedEmoji"
                        label="Emoji selecionado"
                        name="emoji"
                        prepend-inner-icon="mdi-emoticon-outline"
                        type="text"
                        variant="outlined"
                        class="mb-4"
                        hide-details
                      >
                      </v-text-field>
                      <div class="picker-container">
                        <EmojiPicker :native="true" @select="onSelectEmoji" />
                      </div>
                    </v-form>
                  </div>
                </v-expand-transition>
              </v-list-item>
              <v-list-item>
                <div v-if="!newItemFlag">
                  <v-btn
                    @click="newItemFlag = true"
                    class="text-white font-weight-bold"
                    color="#267bff"
                    size="default"
                    variant="elevated"
                  >
                    Adicionar área
                  </v-btn>
                </div>
                <v-expand-transition>
                  <div v-if="newItemFlag">
                    <v-form @submit.prevent="" class="px-4 py-2">
                      <v-text-field
                        v-model="newAreaName"
                        label="Editar nome da área"
                        name="area"
                        prepend-inner-icon="mdi-bookshelf"
                        type="text"
                        variant="outlined"
                        class="mb-4"
                        hide-details
                      >
                      </v-text-field>
                      <v-text-field
                        v-model="newSelectedEmoji"
                        label="Emoji selecionado"
                        name="emoji"
                        prepend-inner-icon="mdi-emoticon-outline"
                        type="text"
                        variant="outlined"
                        class="mb-4"
                        hide-details
                      >
                      </v-text-field>
                      <div class="picker-container d-flex align-center justify-space-between">
                        <EmojiPicker :native="true" @select="onSelectNewEmoji" />
                        <div>
                          <v-btn @click="newItemFlag = false" icon="mdi-close" variant="plain">
                          </v-btn>
                          <v-btn
                            @click="createNewArea"
                            variant="plain"
                            class="ml-2"
                            icon="mdi-content-save-outline"
                          >
                          </v-btn>
                        </div>
                      </div>
                    </v-form>
                  </div>
                </v-expand-transition>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { updateArea, createArea } from '@/services/AreaService'
import { ref, onMounted } from 'vue'
import { getUser } from '@/services/UserService'
import { getAreas } from '@/services/AreaService'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

interface Area {
  id: string
  name: string
  emoji?: string
}

const name = ref('')
const areas = ref<Area[]>([])
const itemEdited = ref<number | null>(null)
const router = useRouter()
const selectedEmoji = ref('')
const newItemFlag = ref(false)
const newAreaName = ref('')
const newSelectedEmoji = ref('')

function logout() {
  localStorage.removeItem('token')
  router.push({ name: 'login' })
}

function editItem(index: number) {
  if (itemEdited.value === index) {
    itemEdited.value = null
  } else {
    const item = areas.value[index]
    if (!item) return
    itemEdited.value = index
    selectedEmoji.value = item.emoji || ''
  }
}

async function createNewArea() {
  const trimmedName = newAreaName.value.trim()
  const userId = localStorage.getItem('userId')

  if (!userId) return
  if (!trimmedName) return

  try {
    await createArea({
      userId: userId,
      name: trimmedName,
      emoji: newSelectedEmoji.value || undefined,
    })
    await listAreas()
    newAreaName.value = ''
    newSelectedEmoji.value = ''
    newItemFlag.value = false
  } catch (error) {
    console.error('Failed to create area:', error)
    return
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function onSelectEmoji(emoji: any) {
  selectedEmoji.value = emoji.i
}

function onSelectNewEmoji(emoji: any) {
  newSelectedEmoji.value = emoji.i
}

async function saveItem(areaId: string) {
  if (itemEdited.value === null) return
  const item = areas.value[itemEdited.value]
  if (!item) return
  try {
    await updateArea({
      userId: localStorage.getItem('userId') || '',
      areaId: areaId,
      name: item.name,
      emoji: selectedEmoji.value,
    })
    item.emoji = selectedEmoji.value
    itemEdited.value = null
  } catch (error) {
    console.error('Failed to update area:', error)
  }
}

async function getUserName() {
  const userId = localStorage.getItem('userId')
  if (!userId) return
  const responseData = await getUser({ userId })
  name.value = responseData.full_name
}

async function listAreas() {
  const userId = localStorage.getItem('userId')
  if (!userId) return
  const responseData = await getAreas(userId)
  areas.value = responseData
}

onMounted(async () => {
  await getUserName()
  await listAreas()
})
</script>

<style scoped>
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

.picker-container {
  transform: scale(0.9);
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
