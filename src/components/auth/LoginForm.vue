<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const login = async () => {
  await store.dispatch("login", {
    email: email.value,
    password: password.value,
  });
  await router.push("/home");
};
</script>
<template>
  <div class="container">
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          v-model="email"
        />
      </div>
      <br />
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <br />
      <button class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
