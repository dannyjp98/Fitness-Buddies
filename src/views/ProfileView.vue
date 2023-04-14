<script>
import { db, auth, storage } from "@/firebase";
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { doc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { deleteUser } from "firebase/auth";
import ProfileImage from "@/components/common/ProfileImage.vue";
import InterestLabel from "@/components/common/InterestLabel.vue";
import { Tippy } from "vue-tippy";

export default {
  name: "ProfileVue",
  components: { Tippy, InterestLabel, ProfileImage },
  setup() {
    const store = useStore();
    const router = useRouter();

    auth.onAuthStateChanged((user) => store.dispatch("fetchUser", user));
    const user = computed(() => store.getters.user).value.data;

    const state = reactive({
      profile: {},
    });

    const edit = ref(false);
    const newName = ref("");
    const newPhone = ref("");
    const newBio = ref("");
    const newCity = ref("");
    const newExp = ref({});

    const userRef = doc(db, "users", user.uid);

    onSnapshot(userRef, (doc) => {
      state.profile = doc.data();
      newName.value = state.profile.name;
      newPhone.value = state.profile.phone;
      newBio.value = state.profile.bio;
      newCity.value = state.profile.city;
      state.profile.interests.map(
        (interest) => (newExp.value[interest.interest] = interest.experience)
      );
    });

    const saveEdits = async () => {
      let selectedInterests = [];
      for (let i in newExp.value) {
        selectedInterests.push({
          interest: i,
          experience: parseInt(newExp.value[i]),
        });
      }

      await updateDoc(userRef, {
        name: newName.value,
        phone: newPhone.value,
        city: newCity.value,
        bio: newBio.value,
        interests: selectedInterests,
      });
      edit.value = false;
    };

    const deleteProfile = async () => {
      deleteObject(storageRef(storage, `users/${user.uid}/profile`));
      deleteDoc(userRef);
      await store.dispatch("logout");
      await deleteUser(user);
      await router.push("/");
    };

    return {
      user,
      state,
      edit,
      newName,
      newPhone,
      newBio,
      newCity,
      newExp,
      saveEdits,
      deleteProfile,
    };
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
  },
};
</script>
<template>
  <main>
    <br />
    <div class="container-fluid profile">
      <div class="row-3 d-flex align-items-center">
        <div class="card">
          <div class="container-fluid">
            <div class="row">
              <Suspense>
                <ProfileImage class="pic" :uid="user.uid" />
              </Suspense>
            </div>
            <div class="row">
              <div class="col justify-content-center d-flex" v-if="!edit">
                <h1>{{ state.profile.name }}</h1>
              </div>
              <div class="col align-items-center d-flex flex-column" v-else>
                <h1>Full Name</h1>
                <input class="form-control" type="text" v-model="newName" />
                <br />
              </div>
            </div>
            <div class="row">
              <div
                class="col align-items-center d-flex flex-column"
                v-if="!edit"
              >
                <h2>Phone Number:</h2>
                <h3>{{ state.profile.phone }}</h3>
                <br />
              </div>
              <div class="col align-items-center d-flex flex-column" v-else>
                <h3>Phone Number</h3>
                <input class="form-control" type="tel" v-model="newPhone" />
                <br />
              </div>
            </div>
            <div class="row">
              <div
                class="col justify-content-center d-flex flex-column"
                v-if="!edit"
              >
                <h3>Bio:</h3>
                <p v-if="!edit" class="bio">{{ state.profile.bio }}</p>
              </div>
              <div class="col align-items-center d-flex flex-column" v-else>
                <h3>Bio</h3>
                <textarea
                  class="form-control"
                  type="text"
                  v-model="newBio"
                  rows="2"
                ></textarea>
                <br />
              </div>
            </div>
            <div class="row">
              <div
                class="col justify-content-center d-flex flex-column"
                v-if="!edit"
              >
                <h3>Location:</h3>
                <p>{{ state.profile.city }}</p>
              </div>
              <div class="col align-items-center d-flex flex-column" v-else>
                <h3>Location</h3>
                <tippy placement="bottom" style="margin: 0; width: 100%">
                  <input
                    class="form-control"
                    type="text"
                    v-model="newCity"
                    style="margin-left: 70px"
                    disabled
                  />
                  <template #content>
                    Fitness Buddies is only available in Ann Arbor, MI at this time
                  </template>
                </tippy>
                <br />
              </div>
            </div>
            <div class="row">
              <div
                class="col align-items-center d-flex flex-column"
                v-if="!edit"
              >
                <div class="row align-items-center d-flex flex-row flex-wrap">
                  <div class="col" v-for="interest in state.profile.interests">
                    <InterestLabel
                      :interest="interest.interest"
                      :experience="interest.experience"
                    ></InterestLabel>
                  </div>
                </div>
              </div>
              <div class="col align-items-center d-flex flex-column" v-else>
                <h3>Interests:</h3>
                <div class="row" v-for="interest in state.profile.interests">
                  <div class="col">
                    <h5>{{ interest.interest }}</h5>
                  </div>
                  <div class="col">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      oninput="this.parentElement.nextSibling.firstChild.textContent = this.value"
                      v-model="newExp[interest.interest]"
                    />
                  </div>
                  <div class="col">
                    <p>{{ interest.experience }}</p>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-sm">
                <button
                  class="btn btn-primary"
                  v-if="!edit"
                  @click="toggleEdit"
                >
                  Edit Information
                </button>
                <button class="btn btn-success" v-else @click="saveEdits">
                  Save Changes
                </button>
              </div>
              <div class="col-sm">
                <button
                  class="btn btn-danger"
                  v-if="!edit"
                  @click="deleteProfile"
                >
                  Delete Profile
                </button>
                <button class="btn btn-danger" v-else @click="toggleEdit">
                  Discard Changes
                </button>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.profile {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
img {
  display: block;
  margin: auto;
}
.form-control {
  text-align: center;
  border-color: #007bff;
  width: 75%;
}
li h5 {
  text-align: center;
}

.pic {
  width: 100px;
  height: 100px;
}
</style>
