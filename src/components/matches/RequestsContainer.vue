<template>
  <div v-if="!isLoading">
    <h2>
      Fitness Buddy Matches: <strong>{{ requests.length }}</strong>
    </h2>
    <div class="requestsContainer">
      <div class="container requests" v-for="match in requests">
        <Match :uid="user.uid" :match="match" :is-request="true" />
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
import { onSnapshot, collection, doc, getDoc } from "firebase/firestore";
import Match from "@/components/matches/Match.vue";

export default {
  name: "RequestsContainer",
  components: { Match },
  async setup() {
    const store = useStore();
    const requests = ref([]);
    const isLoading = ref(true);

    const user = computed(() => store.getters.user).value.data;

    const userSnap = await getDoc(doc(db, "users", user.uid));
    const userData = userSnap.data();

    const q = collection(db, "users");
    onSnapshot(q, (querySnapshot) => {
      requests.value = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const uid = doc.ref.path.split('/')[1];
        if (
          user.uid !== uid && // not me
          userData.requests.includes(uid) && // They have requested me
          !userData.resolved.includes(uid) // I have not resolved them
        ) {
          requests.value.push({
            name: data.name,
            uid: uid,
            city: data.city,
            bio: data.bio,
            phone: data.phone,
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
