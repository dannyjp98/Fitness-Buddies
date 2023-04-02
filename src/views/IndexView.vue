<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import { auth } from '@/firebase'
import LoginForm from '@/components/auth/LoginForm.vue'
import SignUpForm from '@/components/auth/SignUpForm.vue'

const login = ref(true)
const router = useRouter()
const store = useStore()

const user = computed(() => store.getters.user).value
auth.onAuthStateChanged(async (u) => {
  store.dispatch('fetchUser', u)
  if (user.loggedIn) {
    await router.push('/home')
  }
})
</script>

<template>
  <main class="main">
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-6">
          <div id="welcome">
            <h1>Welcome to Fitness Buddies!</h1>
            <h5>Never workout alone again!</h5>
            <h5>Find students with similar schedules and hobbies!</h5>
            <h5>Connect with new people and stay in shape together!</h5>
          </div>
        </div>
        <div class="col login">
          <div v-if="login">
            <LoginForm />
            <br />
            <p style="padding: 0% 1%">
              Dont have an account? Sign up <strong @click="login = false">here.</strong>
            </p>
          </div>
          <div v-else>
            <SignUpForm />
            <p style="padding: 0% 7%">
              Already have an account? Log in <strong @click="login = true">here.</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main {
  font-size: 16px;
  color: #007bff;
  padding: 3% 5%;
  box-sizing: unset;
  text-align: left;
}

.main a {
  color: #007bff;
  text-decoration: underline;
}

.login strong:hover {
  text-decoration: underline;
  cursor: pointer;
}

.login p {
  padding: inherit;
}

pre,
code {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  color: #805229;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Roboto Mono', monospace;
  display: block;
  font-weight: bold;
}

input {
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  color: #805229;
  border: #a06633 2px solid;
  padding: 4px;
}

@media (max-width: 576px) {
  .main {
    width: 75%;
    padding: 2% 15%;
    overflow-x: hidden;
    max-width: 100%;
  }
  input {
    width: 100%;
  }
}
</style>
