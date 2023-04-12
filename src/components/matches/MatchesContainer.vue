<template>
  <div v-if="!isLoading">
    <h2>
      Fitness Buddy Matches: <strong>{{ matches.length }}</strong>
    </h2>
    <div class="container matchContainer" v-for="match in matches">
      <Match :match="match" :is-request="false" />
    </div>
  </div>
  <div v-else>
    <h2>Loading Matches...</h2>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { doc, onSnapshot, collection } from "firebase/firestore";
import ProfileImage from "@/components/common/ProfileImage.vue";
import InterestLabel from "@/components/common/InterestLabel.vue";
import Match from "@/components/matches/Match.vue";

export default {
  name: "MatchesContainer",
  components: { Match, InterestLabel, ProfileImage },
  setup() {
    const store = useStore();
    const matches = ref([]);
    const isLoading = ref(true);

    const state = reactive({
      profile: {},
    });
    const user = computed(() => store.getters.user).value.data;
    const userRef = doc(db, "users", user.uid);
    onSnapshot(userRef, (doc) => {
      state.profile = doc.data();
    });

    const q = collection(db, "users");
    onSnapshot(q, (querySnapshot) => {
      matches.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (!data.requests.includes(user.uid)) {
          matches.value.push({
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

    return { state, user, matches, isLoading };
  },
};
</script>

<style scoped>
h2 {
  color: #007bff;
}
.matchContainer {
  padding: 0;
}
</style>
