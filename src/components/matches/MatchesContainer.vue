<template>
  <div v-if="!isLoading">
    <h2>
      Fitness Buddy Matches: <strong>{{ matches.length }}</strong>
    </h2>
    <div class="matchContainer">
      <div class="container match" v-for="match in matches">
        <Match :uid="user.uid" :match="match" :is-request="false" />
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
  name: "MatchesContainer",
  components: { Match },
  setup() {
    const store = useStore();
    const matches = ref([]);
    const isLoading = ref(true);

    const user = computed(() => store.getters.user).value.data;

    const q = collection(db, "users");
    onSnapshot(q, (querySnapshot) => {
      matches.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (
          !data.requests.includes(user.uid) &&
          !data.resolved.includes(user.uid)
        ) {
          matches.value.push({
            name: data.name,
            uid: doc.ref.path.split("/")[1],
            city: data.city,
            bio: data.bio,
            phone: data.phone,
            interests: data.interests,
          });
        }
        isLoading.value = false;
      });
    });

    return { user, matches, isLoading };
  },
};
</script>

<style scoped>
h2 {
  color: #007bff;
}
.match {
  padding: 0;
}
.matchContainer {
  overflow: scroll !important;
  height: 95vh;
}
</style>
