import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import store from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: () => import("@/views/IndexView.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/buddies",
      name: "buddies",
      component: () => import("@/views/BuddiesView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: {
        async beforeRouteEnter(to, from, next) {
          await store.dispatch("logout");
          next("/");
        },
      },
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (to.meta.requiresAuth) {
    if (!user) {
      return {
        path: "/",
        redirect: to.fullPath,
      };
    }
  }
});

export default router;
