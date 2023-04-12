<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

import { interestsList } from "@/models/interests";
import { db } from "@/firebase";

const router = useRouter();

let levels = {};
interestsList.map((interest) => (levels[interest] = 0));

const selected = ref([]);
const interests = ref(interestsList);
const email = ref("");
const password = ref("");
const name = ref("");
const phone = ref("");
const city = ref("Ann Arbor, MI");
const bio = ref("");
const experiences = ref(levels);

const store = useStore();
const storage = getStorage();

let profilePic;

const register = async () => {
  let selectedInterests = [];
  for (let i in selected.value) {
    selectedInterests.push({
      interest: selected.value[i],
      experience: parseInt(experiences.value[selected.value[i]]),
    });
  }

  try {
    await store.dispatch("register", {
      email: email.value,
      password: password.value,
    });
  } catch (error) {
    alert("Password must be at least 6 characters");
  }

  const user = store.getters.user.data;

  const sRef = storageRef(storage, `users/${user.uid}/profile`);

  await Promise.all([
    setDoc(doc(db, "users", user.uid), {
      name: name.value,
      phone: phone.value,
      city: city.value,
      bio: bio.value,
      interests: selectedInterests,
    }),
    uploadBytes(sRef, profilePic),
    router.push("/home"),
  ]);
};

const onUpload = (event) => (profilePic = event.target.files[0]);
</script>
<script>
import vSelect from "vue-select";
import { Tippy } from "vue-tippy";
export default {
  name: "SignUpForm",
  components: {
    vSelect: vSelect,
    Tippy,
  },
};
</script>

<template>
  <div class="main d-flex justify-content-center" id="main">
    <br />
    <div class="container">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="nameInput">Name</label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            placeholder="Enter name"
            v-model="name"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="emailInput">Email</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            placeholder="Enter email"
            v-model="email"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="passwordInput">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="Enter password"
            v-model="password"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="phoneInput">Phone Number</label>
          <input
            type="number"
            class="form-control"
            id="phoneInput"
            placeholder="Enter phone number"
            v-model="phone"
            required
          />
        </div>
        <br />
        <tippy placement="bottom">
          <div class="form-group">
            <label for="cityInput">City</label>
            <input
              type="text"
              class="form-control"
              id="cityInput"
              placeholder="Enter city"
              v-model="city"
              disabled
            />
          </div>
          <template #content>
            Fitness Buddies is only available in Ann Arbor, MI at this time
          </template>
        </tippy>
        <br />
        <div class="form-group">
          <label for="profilePicInput">Profile Picture</label>
          <input
            type="file"
            class="form-control"
            id="profilePicInput"
            placeholder="Profile Picture"
            @change="onUpload"
            accept="image/*"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="bioInput">Short Bio</label>
          <input
            type="text"
            class="form-control"
            id="bioInput"
            placeholder="Enter a short bio"
            v-model="bio"
            required
          />
        </div>
        <br />
        <div class="form-group">
          <label for="interestInput">Select Up To 3 Interests</label>
          <v-select
            v-model="selected"
            multiple
            placeholder="Choose up to 3 interests!"
            label="title"
            :options="interests"
            :selectable="() => selected.length < 3"
          />
        </div>
        <br />
        <div class="form-group" id="experience">
          <div class="container">
            <div v-for="(interest, index) in selected" :key="index" class="row">
              <div class="col-8">
                <label>{{ interest }} Experience Level (1-10): </label>
              </div>
              <div class="col">
                <input
                  type="range"
                  min="1"
                  max="10"
                  required
                  v-model="experiences[interest]"
                />
              </div>
              <div class="col">
                <p>{{ experiences[interest] }}</p>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
        <button class="btn btn-primary">Sign Up!</button>
      </form>
    </div>
  </div>
</template>
