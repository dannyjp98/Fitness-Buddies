

<template>
  <main>Logged in as {{ user.email }}</main>
  <div>Found {{ data.length }} Results!</div>
  <div class="row" v-for="profile in data">
    <ResultEntry 
    :city="profile.city" 
    :bio="profile.bio" 
    :name="profile.name"
    :interests="profile.interests"
    :uid="profile.uid">
  </ResultEntry>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import ResultEntry from "@/components/common/ResultEntry.vue";
import { db } from "@/firebase";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { reactive } from "vue";

const auth = getAuth();
const usersRef = collection(db, "users");

const data = reactive([]);

try{
  const q = query(collection(db, "users"), where("city", "==", "Ann Arbor"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
  data.push(doc.data());
})
} catch (error) {
    console.log(error);
}

export default {
    name: "HomeView",
    setup(){
      return { data };
    },
    data() {
        return {
            user: auth.currentUser,
        };
    },
    components: { ResultEntry }

};
</script>

<style scoped></style>
