<template>
  <div v-if="!isLoading">
    <h2>
      Fitness Buddy Matches: <strong>{{ requests.length }}</strong>
    </h2>
    <div class="requestsContainer">
      <div class="container requests" v-for="match in requests">
        <Match :match="match" :is-request="true" />
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Loading Matches...</h2>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { onSnapshot, collection } from "firebase/firestore";
import Match from "@/components/matches/Match.vue";

export default {
  name: "RequestsContainer",
  components: { Match },
  setup() {
    const store = useStore();
    const requests = ref([]);
    const isLoading = ref(true);

    const user = computed(() => store.getters.user).value.data;

    const q = collection(db, "users");
    onSnapshot(q, (querySnapshot) => {
      requests.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          data.requests.includes(user.uid) &&
          !data.resolved.includes(user.uid)
        ) {
          requests.value.push({
            name: data.name,
            uid: doc.ref.path.split("/")[1],
            city: data.city,
            bio: data.bio,
            interests: data.interests,
          });
        }
        isLoading.value = false;
      });
    });

    return { user, requests, isLoading };
  },
};
</script>

<style scoped>
h2 {
  color: #007bff;
}

.requests {
  padding: 0;
}

.requestsContainer {
  overflow: scroll !important;
  height: 95vh;
}
</style>
