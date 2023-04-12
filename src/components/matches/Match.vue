<template>
  <div class="row-md-2 match">
    <div class="container overflow-hidden">
      <div class="row d-flex">
        <div class="col">
          <Suspense>
            <ProfileImage :uid="match.uid" class="pic" />
          </Suspense>
        </div>
        <div class="col d-flex align-items-center justify-content-center">
          <h4>{{ match.name }}</h4>
        </div>
      </div>
      <div class="row justify-content-center">{{ match.bio }}</div>
      <div class="row justify-content-center">
        {{ match.city }}
      </div>
      <br />
      <div
        class="row g-5 justify-content-center"
        v-for="interest in match.interests"
      >
        <InterestLabel
          :interest="interest.interest"
          :experience="interest.experience"
          class="label"
        />
      </div>
      <div class="row justify-content-center" v-if="!isRequest">
        <a href="">Connect</a>
      </div>
      <div class="row justify-content-center" v-else>
        <div class="col">
          <button class="btn btn-success">Accept</button>
        </div>
        <div class="col">
          <button class="btn btn-danger">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InterestLabel from "@/components/common/InterestLabel.vue";
import ProfileImage from "@/components/common/ProfileImage.vue";

export default {
  name: "Match",
  components: { ProfileImage, InterestLabel },
  props: {
    match: {
      name: String,
      uid: String,
      bio: String,
      city: String,
      interests: [Object],
    },
    isRequest: Boolean,
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
</style>
