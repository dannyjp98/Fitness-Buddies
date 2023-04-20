<script>
import SentRequests from "@/components/matches/SentRequests.vue";
import BuddiesContainer from "@/components/matches/BuddiesContainer.vue";

export default {
  name: "BuddiesView",
  components: { BuddiesContainer, SentRequests },
};
</script>

<template>
  <br />
  <div class="row">
    <div class="col-3">
      <Suspense>
        <SentRequests />
      </Suspense>
    </div>
    <div class="col">
      <Suspense>
        <BuddiesContainer />
      </Suspense>
    </div>
  </div>
</template>

<style scoped>
div.row {
  margin-left: 5px;
  margin-right: 5px;
}
</style>
