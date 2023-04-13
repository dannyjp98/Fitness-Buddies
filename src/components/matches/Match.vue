<template>
  <div class="row-md-2 match">
    <br />
    <div class="container">
      <div class="row d-flex">
        <div class="col">
          <ProfileImage :uid="match.uid" class="pic" />
        </div>
        <div class="col d-flex align-items-center justify-content-center">
          <h4>{{ match.name }}</h4>
        </div>
      </div>
      <div class="row justify-content-center">{{ match.bio }}</div>
      <br />
      <div class="row justify-content-center" v-if="isRequest">
        Contact: {{ match.phone }}
      </div>
      <br v-if="isRequest" />
      <div class="row justify-content-center">
        <div
          class="col"
          v-for="interest in match.interests"
          :key="interest.interest"
        >
          <InterestLabel
            :interest="interest.interest"
            :experience="interest.experience"
            class="label"
          />
        </div>
      </div>
      <br />
      <div class="row justify-content-center" v-if="!isRequest">
        <div class="col">
          <button
            class="btn btn-primary rounded-pill"
            @click="connect(match.uid)"
          >
            Connect
          </button>
        </div>
      </div>
      <div class="row justify-content-center" v-else>
        <div class="col">
          <button class="btn btn-success" @click="resolve(match.uid)">
            Accept
          </button>
        </div>
        <div class="col">
          <button class="btn btn-danger" @click="resolve(match.uid)">
            Reject
          </button>
        </div>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import { db } from "@/firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import InterestLabel from "@/components/common/InterestLabel.vue";
import ProfileImage from "@/components/common/ProfileImage.vue";

export default {
  name: "Match",
  components: { ProfileImage, InterestLabel },
  props: {
    uid: String,
    match: {
      name: String,
      uid: String,
      bio: String,
      city: String,
      phone: Number,
      interests: [Object],
    },
    isRequest: Boolean,
  },
  methods: {
    async connect(ruid) {
      await updateDoc(doc(db, "users", ruid), {
        requests: arrayUnion(this.uid.trim()),
      });
    },
    async resolve(ruid) {
      await updateDoc(doc(db, "users", this.uid), {
        requests: arrayRemove(ruid.trim()),
        resolved: arrayUnion(ruid.trim()),
      });
    },
  },
};
</script>

<style scoped>
.match {
  background-color: rgb(205, 204, 204);
  border-radius: 30px;
  padding: 20px;
  width: 100%;
  text-align: center;
  margin: 10px 10px 10px 0;
}

.pic {
  width: 50px;
  height: 50px;
  border-radius: 30px;
}

.connect {
  width: 20%;
}
h4 {
  font-family: "Roboto Mono", monospace;
}
</style>
