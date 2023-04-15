<template>
  <div class="tag w3-tag w3-padding w3-round-large w3-blue">
    {{ interest }}
    <span class="level"> {{ this.experience }}/10</span>
  </div>
  <!-- <tippy
    class="tag w3-tag w3-padding w3-round-large w3-blue"
    placement="bottom"
  >
    {{ interest }}
    <template #content> {{ this.experience }}/10 </template>
  </tippy> -->
</template>

<script>
import { Tippy } from "vue-tippy";

export default {
  name: "InterestLabel",
  props: {
    interest: String,
    experience: Number,
  },
  components: { Tippy },
};
</script>

<style scoped>
.tag {
  font-weight: 550;
  background-color: #4eb5ff;
  display: inline-block;
  color: white;
  margin-left: 0.5rem;
  margin-right: 1.5rem;
}
</style>
