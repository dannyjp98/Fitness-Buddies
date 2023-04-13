<template>
  <div v-if="!isLoading">
    <h3>
      <template v-if="!requestsContainer"> Fitness Buddy Matches: </template>
      <template v-else> Pending Fitness Buddy Requests: </template>
      <strong>{{ matches.length }}</strong>
    </h3>
    <div class="matchContainer">
      <div class="container match" v-for="match in matches" :key="match.uid">
        <Match
          :uid="user.uid"
          :match="match"
          :is-request="false"
          v-if="!requestsContainer"
        />
        <Match :uid="user.uid" :match="match" :is-request="true" v-else />
      </div>
    </div>
  </div>
  <div v-else>
    <h2 v-if="!requestsContainer">Loading Matches...</h2>
    <h2 v-else>Loading Requests...</h2>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { onSnapshot, collection, getDoc, doc } from "firebase/firestore";
import Match from "@/components/matches/Match.vue";

export default {
  name: "MatchesContainer",
  components: { Match },
  props: { requestsContainer: Boolean },
  async setup(props) {
    const store = useStore();
    const matches = ref([]);
    const isLoading = ref(true);

    const user = computed(() => store.getters.user).value.data;

    const userSnap = await getDoc(doc(db, "users", user.uid));
    const userData = userSnap.data();

    const q = collection(db, "users");
    onSnapshot(q, (querySnapshot) => {
      matches.value = [];
      if (!props.requestsContainer) {
        // This is a match container
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const uid = doc.ref.path.split("/")[1];
          if (
            user.uid !== uid && // not me
            !data.requests.includes(user.uid) && // I have not requested them
            !userData.requests.includes(uid) && // they havent requested me
            !data.resolved.includes(user.uid) && // they havent resolved me
            !userData.resolved.includes(uid) // I havent resolved them
          ) {
            matches.value.push({
              name: data.name,
              uid: uid,
              city: data.city,
              bio: data.bio,
              phone: data.phone,
              interests: data.interests,
            });
          }
        });
      } else {
        console.log("trigged");
        // This is a requests container
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const uid = doc.ref.path.split("/")[1];
          if (
            user.uid !== uid && // not me
            userData.requests.includes(uid) && // They have requested me
            !userData.resolved.includes(uid) // I have not resolved them
          ) {
            matches.value.push({
              name: data.name,
              uid: uid,
              city: data.city,
              bio: data.bio,
              phone: data.phone,
              interests: data.interests,
            });
          }
        });
      }
      isLoading.value = false;
    });

    return { user, matches, isLoading };
  },
};
</script>

<style scoped>
h2,
h3 {
  font-family: "Roboto Mono", monospace;
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
