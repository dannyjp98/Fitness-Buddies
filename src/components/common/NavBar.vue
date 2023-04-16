<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { auth } from "@/firebase";

export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    auth.onAuthStateChanged((user) => {
      store.dispatch("fetchUser", user);
    });
    const user = computed(() => store.getters.user);
    return { user };
  },
};
</script>
<template>
  <nav class="navbar navbar-expand-lg">
    <img src="/favicon.ico" alt="" />
    <RouterLink to="/" class="navbar-brand">Fitness Buddies</RouterLink>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
      v-if="user.loggedIn"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto" v-if="user.loggedIn">
        <li class="nav-item active">
          <RouterLink to="/home" class="nav-link">Matches</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/buddies" class="nav-link">Buddies</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/profile" class="nav-link">Profile</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/logout" class="nav-link">Logout</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background-color: #007bff;
  color: #fffff0;
  font-size: 20px;

  --bs-navbar-color: unset;
  --bs-navbar-hover-color: unset;
  --bs-navbar-brand-color: unset;
  --bs-navbar-brand-hover-color: unset;
}

.navbar-brand {
  color: inherit;
  margin: 10px;
}

.navbar-brand:hover {
  color: inherit;
  text-decoration: underline;
}
.navbar-collapse {
  justify-content: flex-end;
  color: inherit;
}
.navbar-toggler-icon {
  fill: white;
}
.nav-link {
  color: inherit;
}
.nav-link:hover {
  text-decoration: underline;
}

img {
  padding-left: 10px;
  border-radius: 50px;
}
</style>
