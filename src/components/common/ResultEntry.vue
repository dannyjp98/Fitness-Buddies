<template>
  <div class="outer row-md-2 match">
    <div class="container overflow-hidden">
        <div class="row d-flex">
            <div class="col">
                <ProfileImage :uid="uid"/>
            </div>
        </div>
        <div class="col d-flex align-items-center justify-content-center">
                <h4>{{ name }}</h4>
            </div>
        <div class="row justify-content-center">
            {{ city }}
        </div>
        <div class="row justify-content-center">
            {{ bio }}
        </div>
        <br>
        <div class="row g-5 justify-content-center">
            <div class="col" v-for="x in interests">
                <InterestLabel
                    :interest="x.interest"
                    :experience="x.experience"
                ></InterestLabel>
                </div>
        </div>
        <div class="row justify-content-center">
            <a href="">Connect</a>
        </div>
    </div>
  </div>
</template>

<script>
import InterestLabel from "@/components/common/InterestLabel.vue";
import ProfileImage from "@/components/common/ProfileImage.vue";

export default {
  name: "ResultEntry",
  props: {
    city: String,
    bio: String,
    name: String,
    uid: String,
    interests: Array
  },
  components: { InterestLabel, ProfileImage},
  setup() {}
};
</script>

<style scoped>
.tag {
  border-radius: 0.5rem;
  font-weight: 700;
  background-color: #4eb5ff;
  color: rgb(0, 0, 0);
  margin-bottom: 0.75rem;
  display: inline-block;
  color: white;
  margin-left: 0.5rem;
  margin-right: 1.5rem;
  width: 100%;
  height: 3vh;
  padding-top: 0.5vh;
}

.outer {
    background-color: #dcf0ff;
    border-radius: 50px;
    margin-left: 0.5rem;
    margin-right: 1.5rem;
    margin-top: 1.5rem;
}
</style>
