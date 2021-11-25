<template>
  <div>
    <div class="fixed inset-0 bg-primary custom-bg z-[5]"></div>

    <div
      class="sticky top-0 z-40 flex flex-col items-center justify-between w-full p-6 space-y-2 bg-white shadow-lg  lg:space-y-0 lg:space-x-3 lg:flex-row rounded-b-2xl"
    >
      <div class="flex items-center space-x-3">
        <div class="p-3 bg-gray-100 rounded-2xl text-pink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="flex flex-row items-end space-x-2">
          <p class="text-lg text-gray-400">Made with</p>
          <p class="text-2xl font-semibold text-pink">Appwrite</p>
        </div>
      </div>

      <div class="flex space-x-9">
        <NuxtLink class="text-gray-500 hover:underline" to="/app"
          >Home</NuxtLink
        >
      </div>

      <div class="flex space-x-3">
        <button
          @click="onLogout"
          class="px-8 py-3 text-gray-500 bg-gray-100  rounded-2xl hover:bg-gray-200 focus:ring focus:ring-gray-300"
        >
          Logout
        </button>
        <NuxtLink to="/new-post">
          <button
            class="px-8 py-3 text-white  rounded-2xl bg-pink hover:bg-pink-600 focus:ring focus:ring-pink-200"
          >
            Submit Project
          </button></NuxtLink
        >
      </div>
    </div>

    <div
      class="relative z-10 flex flex-col min-h-screen px-3 mt-6 min-w-screen"
    >
      <div
        class="absolute bottom-0 left-0 w-full h-20  bg-gradient-to-t from-black to-primary opacity-10"
      ></div>

      <img
        class="absolute z-10 hidden left-10 bottom-10 sm:block"
        src="/dots-bl.svg"
        alt=""
      />
      <img
        class="absolute z-10 hidden right-10 top-10 sm:block"
        src="/dots-tr.svg"
        alt=""
      />

      <div
        class="flex flex-col items-center justify-center h-full pb-20 space-y-20 "
      >
        <div class="w-full max-w-2xl mt-6 space-y-6">
          <alert
            v-if="showAlert"
            title="Wohoo"
            text="Successfully logged in. Let's see what's new!"
          />

          <Nuxt />
        </div>
      </div>
    </div>

    <div
      v-bind:class="[
        realtimeData ? 'translate-y-0 scale-100' : 'translate-y-40 scale-0',
      ]"
      class="fixed inset-x-0 bottom-0 z-50 pb-2 transition duration-500 ease-in-out transform translate-y-0 opacity-100  z-100 sm:pb-5"
    >
      <div class="max-w-screen-xl px-2 mx-auto sm:px-4">
        <div class="p-2 bg-gray-900 rounded-lg shadow-lg sm:p-3">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex items-center flex-1 w-0">
              <div class="p-2 text-white bg-gray-800 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z"
                  />
                  <path
                    d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z"
                  />
                </svg>
              </div>
              <p class="ml-3 font-medium text-white truncate">
                <span class="inline text-gray-400"
                  ><strong class="mr-1 font-semibold text-white"
                    >New project!</strong
                  ><span class="inline"
                    >{{ realtimeData ? realtimeData.text : "" }}
                  </span></span
                >
              </p>
            </div>
            <div
              class="flex-shrink-0 order-3 w-full mt-2  sm:order-2 sm:mt-0 sm:w-auto"
            >
              <div class="rounded-md shadow-sm">
                <a
                  target="_blank"
                  :href="realtimeData ? realtimeData.url : '#'"
                  class="flex items-center justify-center px-4 py-2 space-x-3 text-sm font-medium leading-5 text-gray-900 bg-white border border-transparent rounded-md  hover:text-gray-800 focus:outline-none focus:underline"
                >
                  <svg
                    class="w-5 h-5 text-gray-600"
                    width="250"
                    height="243"
                    viewBox="0 0 256 249"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <g fill="currentColor">
                      <path
                        d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"
                      />
                      <path
                        d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"
                      />
                    </g></svg
                  ><span> View on GitHub</span></a
                >
              </div>
            </div>
            <div class="flex-shrink-0 order-2 sm:order-3 sm:ml-2">
              <button
                type="button"
                class="flex p-2 -mr-1 rounded-md  hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
                aria-label="Hide banner"
              >
                <svg
                  class="w-6 h-6 text-white"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AppwriteService } from "../services/appwrite";
import * as util from "util";

export default Vue.extend({
  middleware: "only-authentificated",
  data: () => {
    return {
      showAlert: false,
      realtimeData: null,
    } as {
      showAlert: boolean;
      realtimeData: null | {
        url: string;
        text: string;
      };
    };
  },
  watch: {
    $route(to, from) {
      if (this.$route) {
        this.showAlert = this.$route.query.alert === "1";
      }
    },
  },
  methods: {
    async onLogout() {
      this.$nuxt.$loading.start();

      const didLogout = await AppwriteService.logout();

      this.$nuxt.$loading.finish();

      if (didLogout) {
        this.$router.push("/login");
      }
    },
  },
  mounted() {
    if (this.$route) {
      this.showAlert = this.$route.query.alert === "1";
    }

    AppwriteService.initPostsSubscription(async (post) => {
      const sleep = util.promisify((a: any, f: any) => setTimeout(f, a));
      this.realtimeData = null;
      await sleep(50);

      this.realtimeData = post;
      await sleep(5000);
      this.realtimeData = null;
    });
  },
});
</script>


<style scoped>
.custom-bg {
  background-color: linear-gradient(180deg, #f02e65 0%, #c81b4c 100%);

  background-image: url("/bg.png");
  background-position: center;
  background-size: cover;
}

.nuxt-link-active {
  @apply font-semibold !text-black;
}
</style>