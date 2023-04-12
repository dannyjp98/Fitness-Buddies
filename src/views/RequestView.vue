<template>
  <br />
  <h1>Pending Requests:</h1>
</template>

<script>
import { getAuth } from "firebase/auth";
const auth = getAuth();
export default {
  name: "RequestView",
  data() {
    return {
      user: auth.currentUser,
    };
  },
};
</script>

<style scoped></style>
