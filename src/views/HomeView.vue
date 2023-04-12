<script>
import MatchesContainer from "@/components/matches/MatchesContainer.vue";
import RequestsContainer from "@/components/matches/RequestsContainer.vue";

export default {
  name: "HomeView",
  components: { MatchesContainer, RequestsContainer },
};
</script>

<template>
  <br />
  <div class="row">
    <div class="col">
      <Suspense>
        <MatchesContainer />
      </Suspense>
    </div>
    <div class="col">
      <div style="width: 100%; margin-top: 45px">
        <iframe
          width="100%"
          height="600"
          frameborder="0"
          scrolling="no"
          marginheight="0"
          marginwidth="0"
          src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=306%20S%20State%20St.%20Ann%20Arbor%20MI+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ><a href="https://www.maps.ie/distance-area-calculator.html"
            >measure area map</a
          ></iframe
        >
      </div>
    </div>
    <div class="col">
      <Suspense>
        <RequestsContainer />
      </Suspense>
    </div>
  </div>
</template>

<style scoped></style>
