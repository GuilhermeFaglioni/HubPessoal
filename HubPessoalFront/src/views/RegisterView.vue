<template>
  <v-container class="height-screen">
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="6" lg="4">
        <h2 class="text-center animated-title">Bem vindo ao seu Hub Pessoal!</h2>
        <v-card width="100%" class="px-4 mt-8 card-with-sidebar" height="35rem">
          <v-form @submit.prevent="handleRegister">
            <v-card-title class="text-center text-h5 mb-4 mt-4"> Crie sua conta </v-card-title>
            <v-card-text>
              <v-text-field
                v-model="name"
                label="Nome"
                name="nome"
                prepend-inner-icon="mdi-account"
                type="text"
                variant="outlined"
                class="mb-4"
              >
              </v-text-field>
              <v-text-field
                v-model="email"
                label="Email"
                name="email"
                prepend-inner-icon="mdi-email-outline"
                type="email"
                variant="outlined"
                class="mb-4"
              >
              </v-text-field>

              <v-text-field
                v-model="password"
                label="Senha"
                name="password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                variant="outlined"
                class="mb-4"
              >
              </v-text-field>

              <v-text-field
                v-model="passwordConfirm"
                label="Confirmar senha"
                name="password"
                prepend-inner-icon="mdi-lock-outline"
                type="password"
                variant="outlined"
                class="mb-4"
                :error-messages="!passwordMatch && password ? ['As senhas não coincidem'] : []"
              >
              </v-text-field>
            </v-card-text>
            <v-card-actions class="px-4 align-center justify-center">
              <v-btn
                :disabled="!passwordMatch || !password"
                class="px-10"
                variant="elevated"
                color="#267BFF"
                size="large"
                type="submit"
              >
                Cadastre-se
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { register } from '@/services/AuthService'
import { ref, computed } from 'vue'

const email = ref('')
const password = ref('')
const name = ref('')
const passwordConfirm = ref('')
const passwordMatch = computed(() => password.value === passwordConfirm.value)
const router = useRouter()

async function handleRegister() {
  try {
    const responseData = await register({
      full_name: name.value,
      email: email.value,
      password: password.value,
    })
    if (responseData.id) {
      router.push({ name: 'login' })
    }
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>

<style scoped>
.animated-title {
  font-size: 1.7rem;
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

.v-container {
  background-color: #f7f7f7;
}
.height-screen {
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
}
</style>
