<template>
  <main>{{ user.email }}</main>
</template>

<script>
import { getAuth } from "firebase/auth";
const auth = getAuth();
export default {
  name: "HomeView",
  data() {
    return {
      user: auth.currentUser,
    };
  },
};
</script>

<style scoped></style>
