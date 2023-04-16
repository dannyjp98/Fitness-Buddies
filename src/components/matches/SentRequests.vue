<template>
  <div v-if="!isLoading">
    <h3>
      <strong>Sent Requests: {{ matches.length }}</strong>
    </h3>
    <div class="matchContainer">
      <div class="container match" v-for="match in matches" :key="match.uid">
        <Match
          :uid="user.uid"
          :match="match"
          :is-request="true"
          :is-buddy="true"
          :is-pending ="true"
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
      
        console.log("Loading Requests");
        // This is a requests container
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const uid = doc.ref.path.split("/")[1];
          console.log(userData.requests);
          if (data.requests.includes(user.uid)){
                console.log("FOUND IN REQUESTS");
                matches.value.push({
                name: data.name,
                uid: uid,
                city: data.city,
                bio: data.bio,
                phone: data.phone,
                interests: data.interests,
              })
          }
        });
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
