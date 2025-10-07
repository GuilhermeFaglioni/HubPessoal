<template>
  <v-container class="height-screen">
    <v-row class="d-flex align-center justify-center">
      <v-col cols="12" md="6" lg="4">
        <h2 class="text-center animated-title">Bem vindo ao seu Hub Pessoal!</h2>
        <v-card width="100%" class="px-4 mt-8 card-with-sidebar" height="25rem">
          <v-form @submit.prevent="handleLogin">
            <v-card-title class="text-center text-h5 mb-4 mt-4"> Acessar sua conta </v-card-title>
            <v-card-text>
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
            </v-card-text>
            <v-card-actions class="px-4 align-center justify-center">
              <v-btn
                class="px-10 text-white"
                type="submit"
                variant="elevated"
                color="#267BFF"
                size="large"
              >
                Entrar
              </v-btn>
              <router-link to="/register" custom v-slot="{ navigate }">
                <v-btn
                  @click="navigate"
                  class="px-10"
                  variant="elevated"
                  color="#EDF4FF"
                  size="large"
                >
                  Cadastre-se
                </v-btn>
              </router-link>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { login } from '@/services/AuthService'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const responseData = await login({ email: email.value, password: password.value })

    if (responseData.token) {
      localStorage.setItem('token', responseData.token)
      localStorage.setItem('userId', responseData.returnUser.id)
      if (responseData.returnUser.hasCompletedOnboarding) router.push({ name: 'home' })
      else {
        router.push({ name: 'onboarding' })
      }
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
