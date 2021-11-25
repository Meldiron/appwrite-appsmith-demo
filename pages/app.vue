<template>
  <div>
    <div v-if="!isLoadingPosts" class="w-full">
      <h1 class="text-4xl font-semibold text-center text-white">
        Recent projects
      </h1>

      <div class="flex flex-col items-center w-full mt-6 space-y-6">
        <div v-if="posts.length <= 0">
          <p class="text-center text-white">
            No projects found. Submit your first project!
          </p>
        </div>
        <div
          v-for="(post, postIndex) in [...trendingPosts, ...posts]"
          :key="post.$id"
          v-bind:class="{
            'border-white': !post.trending,
            'border-pink': post.trending,
          }"
          class="z-20 flex flex-col w-full max-w-2xl p-10 space-y-6 text-lg text-gray-700 bg-white border-4 shadow-2xl  rounded-xl"
        >
          <div
            class="flex justify-center w-full sm:justify-start"
            v-if="post.trending"
          >
            <span
              class="inline-flex items-center justify-center h-6 px-3 text-sm text-white bg-pink-500 rounded-full "
            >
              Trending
            </span>
          </div>

          <div
            class="flex flex-col-reverse items-center justify-between  sm:items-start gap-y-6 sm:gap-y-0 sm:space-x-6 sm:flex-row"
          >
            <div>
              <h1 class="text-2xl font-semibold text-left text-gray-900">
                {{ post.title }}
              </h1>

              <p class="text-left text-gray-500">
                {{ post.description }}
              </p>

              <p class="mt-3 text-sm text-pink-200">
                Proudly made in
                <span class="font-semibold text-pink">
                  {{ getCountryName(post.countryCode) }}</span
                >
              </p>
            </div>

            <img
              class="w-40 h-40"
              :src="getImageThumbnail(post.logoId, postIndex)"
              alt="Project logo"
            />
          </div>

          <a :href="post.githubUrl" target="_blank">
            <button
              class="flex items-center justify-center w-full py-4 space-x-3 font-medium text-white rounded-md shadow-lg  bg-primary hover:bg-pink-600"
            >
              <svg
                class="hidden w-5 h-5 text-white sm:block"
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
                </g>
              </svg>
              <p>View on GitHub</p>
            </button>
          </a>
        </div>

        <button
          @click="onLoadNextPage()"
          v-if="postsSum > posts.length"
          class="flex items-center justify-center w-full py-4 space-x-3 font-medium bg-white rounded-md shadow-lg  text-primary hover:bg-gray-100"
        >
          <svg
            v-if="postsPaginationLoading"
            class="w-5 h-5 animate-spin"
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

          <p>Load more ({{ postsSum - posts.length }} left)</p>
        </button>
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
</template>

<script lang="ts">
import { AppwritePost, AppwriteService } from "../services/appwrite";
import { Models } from "appwrite";
import Vue from "vue";

export default Vue.extend({
  layout: "app",
  data() {
    return {
      countries: [],
      posts: [],
      trendingPosts: [],
      postsSum: 0,
      postsPage: 1,

      isLoadingPosts: true,
      postsPaginationLoading: false,
    } as {
      countries: Models.Country[];
      posts: AppwritePost[];
      trendingPosts: AppwritePost[];
      postsSum: number;
      postsPage: number;
      isLoadingPosts: boolean;
      postsPaginationLoading: boolean;
    };
  },
  async mounted() {
    this.countries = await AppwriteService.getCountryList();

    this.trendingPosts = (
      await AppwriteService.getTrendingProjects()
    ).documents;

    const postsResponse = await AppwriteService.getProjects(this.postsPage);
    this.posts = postsResponse.documents;
    this.postsSum = postsResponse.sum;

    this.isLoadingPosts = false;
  },
  methods: {
    getImageThumbnail(fileId: string, arrayIndex: number) {
      return AppwriteService.getImageThumbnail(fileId, arrayIndex);
    },
    async onLoadNextPage() {
      const originalScrollPosition = document.documentElement.scrollTop;

      this.postsPaginationLoading = true;

      this.postsPage++;

      const postsResponse = await AppwriteService.getProjects(this.postsPage);
      this.posts.push(...postsResponse.documents);

      this.postsPaginationLoading = false;

      setTimeout(() => {
        document.documentElement.scrollTop = originalScrollPosition;
      }, 1);
    },
    getCountryName(code: string) {
      const country = this.countries.find((c) => c.code === code);
      if (!country) {
        return "...";
      }

      return country.name;
    },
  },
});
</script>
