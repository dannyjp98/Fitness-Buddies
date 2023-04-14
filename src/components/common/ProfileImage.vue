<template>
  <img :src="picURL" alt="" />
</template>

<script>
import { getDownloadURL, ref } from "firebase/storage";

import { storage } from "@/firebase";

export default {
  name: "ProfileImage",
  async setup(props) {
    const picURL = await getDownloadURL(
      ref(storage, `users/${props.uid}/profile`)
    );
    return { picURL };
  },
  props: {
    uid: String,
  },
};
</script>

<style scoped>
</style>
