<template>
  <div v-if="!isLoading">
    <h3>
      <strong>{{ matches.length}} Fitness Buddies</strong>
    </h3>
    <div class="matchContainer">
      <div class="container match" v-for="match in matches" :key="match.uid">
        <Match
          :uid="user.uid"
          :match="match"
          :is-request="true"
          :is-buddy="true"
          v-if="!requestsContainer"
        />
      </div>
    </div>
  </div>
  <div v-else>
    <h2>Loading Buddies...</h2>
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
  props: {},
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
      console.log("trigged");
        // This is a requests container
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const uid = doc.ref.path.split("/")[1];
          if (
            user.uid !== uid && // not me
            userData.resolved.includes(uid) // I have not resolved them
          ) {
            matches.value.push({
              name: data.name,
              uid: uid,
              city: data.city,
              bio: data.bio,
              phone: data.phone,
              interests: data.interests,
            });
          } else if (data.resolved.includes(user.uid)){
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
