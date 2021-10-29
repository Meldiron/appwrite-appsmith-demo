<template>
  <div>
    <div class="fixed inset-0 bg-primary custom-bg z-[5]"></div>

    <div class="relative z-10 flex flex-col min-h-screen px-3 min-w-screen">
      <div
        class="absolute bottom-0 left-0 w-full h-20  bg-gradient-to-t from-black to-primary opacity-10"
      ></div>

      <img class="absolute z-10 left-10 bottom-10" src="/dots-bl.svg" alt="" />
      <img class="absolute z-10 right-10 top-10" src="/dots-tr.svg" alt="" />

      <alert
        v-if="showAlert"
        title="Wohoo"
        text="Successfully logged in. Let's add your first project!"
      />
      <div
        class="flex flex-col items-center justify-center h-full py-20 space-y-20 "
      >
        <div class="w-full max-w-2xl space-y-3">
          <div class="flex justify-end w-full">
            <button
              type="button"
              @click="onLogout"
              class="text-white underline"
            >
              Logout
            </button>
          </div>
          <form
            @submit="onAddProject"
            class="z-20 flex flex-col items-center p-10 space-y-8 text-lg text-gray-700 bg-white shadow-2xl  rounded-xl"
          >
            <div class="flex flex-col w-full space-y-1">
              <label for="github" class="block font-medium text-md" style=""
                >Github Project URL</label
              >
              <input
                v-model="url"
                name="github"
                type="text"
                required="required"
                placeholder="Enter GitHub URL"
                value=""
                class="block w-full px-3 py-3 border border-gray-300 rounded-md  focus:ring-pink focus:border-pink sm:text-sm"
              />
            </div>
            <div class="flex flex-col w-full space-y-1">
              <label for="title" class="block font-medium text-md" style=""
                >Project Name</label
              >
              <input
                v-model="title"
                name="title"
                type="text"
                required="required"
                placeholder="Enter name or slogan"
                value=""
                class="block w-full px-3 py-3 border border-gray-300 rounded-md  focus:ring-pink focus:border-pink sm:text-sm"
              />
            </div>
            <div class="flex flex-col w-full space-y-1">
              <label
                for="description"
                class="block font-medium text-md"
                style=""
                >Short Description</label
              >
              <textarea
                v-model="description"
                name="description"
                type="text"
                required="required"
                placeholder="Enter detail about project"
                value=""
                rows="3"
                class="block w-full px-3 py-3 border border-gray-300 rounded-md  focus:ring-pink focus:border-pink sm:text-sm"
              />
            </div>
            <div class="flex justify-end w-full">
              <button
                :disabled="isSubmitLoading"
                type="submit"
                class="flex items-center justify-center px-6 py-4 space-x-3 font-medium text-white rounded-md shadow-lg  disabled:opacity-50 bg-pink filter hover:bg-pink-600"
                style=""
              >
                <svg
                  v-if="!isSubmitLoading"
                  class="w-5 h-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>

                <svg
                  v-if="isSubmitLoading"
                  class="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>

                <p>Submit a project</p>
              </button>
            </div>
          </form>
        </div>

        <div v-if="!isLoadingPosts" class="w-full">
          <h1 class="text-4xl font-semibold text-center text-white">
            Recent posts
          </h1>

          <div class="flex flex-col items-center w-full mt-6 space-y-6">
            <div v-if="posts.length <= 0">
              <p class="text-center text-white">
                No projects found. Submit first project!
              </p>
            </div>
            <div
              v-for="post in posts"
              :key="post.$id"
              v-bind:class="{
                'border-white': !post.trending,
                'border-pink-700': post.trending,
              }"
              class="z-20 flex flex-col w-full max-w-2xl p-10 space-y-8 text-lg text-gray-700 bg-white border-4 shadow-2xl  rounded-xl"
            >
              <div v-if="post.trending">
                <span
                  class="inline-flex items-center justify-center h-6 px-3 text-sm text-white bg-pink-500 rounded-full "
                >
                  Trending
                </span>
              </div>

              <h1 class="text-2xl font-semibold text-left text-gray-900">
                {{ post.title }}
              </h1>

              <p class="text-left text-gray-500">
                {{ post.description }}
              </p>

              <a :href="post.githubUrl" target="_blank">
                <button
                  class="flex items-center justify-center w-full py-4 space-x-3 font-medium text-white rounded-md shadow-lg  bg-primary filter hover:brightness-90"
                >
                  <p>View on GitHub</p>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div v-if="isLoadingPosts" class="flex justify-center">
          <svg
            class="w-10 h-10 text-white animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  middleware: "only-authentificated",
  data() {
    return {
      showAlert: false,
      title: "",
      url: "",
      description: "",
      isSubmitLoading: false,
    };
  },
  computed: {
    ...mapState(["isLoadingPosts", "posts"]),
  },
  mounted() {
    this.showAlert = this.$route.query.alert === "1";
    this.$store.dispatch("forceRefreshProjects");
  },
  methods: {
    async onLogout() {
      this.$nuxt.$loading.start();
      await this.$store.dispatch("logout");
      this.$nuxt.$loading.finish();
      this.$router.push("/");
    },
    async onAddProject(e) {
      e.preventDefault();

      this.isSubmitLoading = true;
      const didSubmitSuccessfully = await this.$store.dispatch(
        "submitProject",
        {
          title: this.title,
          description: this.description,
          githubUrl: this.url,
        }
      );
      this.isSubmitLoading = false;

      if (didSubmitSuccessfully) {
        this.url = "";
        this.title = "";
        this.description = "";
      }
    },
  },
};
</script>

<style scoped>
.custom-bg {
  background-color: linear-gradient(180deg, #f02e65 0%, #c81b4c 100%);

  background-image: url("/bg.png");
  background-position: center;
  background-size: cover;
}
</style>