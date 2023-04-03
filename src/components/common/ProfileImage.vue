<template>
  <img :src="picURL" alt="Profile Picture" />
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
