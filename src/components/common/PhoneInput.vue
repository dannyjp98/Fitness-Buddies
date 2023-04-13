<template>
  <vue-tel-input @validate="validate">
    <template v-slot:icon-right>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="green"
        class="bi bi-check"
        viewBox="0 0 16 16"
        v-if="valid"
      >
        <path
          d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="red"
        class="bi bi-x"
        viewBox="0 0 16 16"
        v-else
      >
        <path
          d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        />
      </svg>
    </template>
  </vue-tel-input>
</template>

<script>
import { VueTelInput } from "vue-tel-input";
export default {
  name: "PhoneInput",
  props: {
    phone: String,
  },
  components: {
    VueTelInput,
  },
  data() {
    return {
      valid: false,
    };
  },
  methods: {
    validate(phone) {
      this.valid = !!phone.valid;
    },
  },
};
</script>

<style scoped></style>
