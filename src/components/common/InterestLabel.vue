<template>
  <tippy class="tag" placement="bottom">
    {{ interest }}
    <template #content>
      {{ this.experience }}/10
    </template>
  </tippy>
</template>

<script >
import { Tippy } from "vue-tippy";
import 'tippy.js/dist/tippy.css'

export default {
  name: "InterestLabel",
  props: {
    interest: String,
    experience: Number,
  },
  components: {Tippy},
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
</style>
