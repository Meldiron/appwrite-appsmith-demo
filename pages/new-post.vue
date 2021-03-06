<template>
  <div>
    <h1 class="mb-10 text-4xl font-semibold text-center text-white">
      Submit a project
    </h1>

    <alert
      v-if="didSubmitSucceed"
      title="Great"
      class="mb-6"
      text="Project successfully submitted!"
    />

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
        <label for="description" class="block font-medium text-md" style=""
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

      <div class="flex flex-col w-full space-y-1">
        <label for="description" class="block font-medium text-md" style=""
          >Proudly made in
        </label>
        <select
          v-model="countryCode"
          class="block w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option
            :value="country.code"
            v-for="country in countries"
            :key="country.code"
          >
            {{ country.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col w-full space-y-1">
        <label for="description" class="block font-medium text-md" style=""
          >Project logo</label
        >
        <!-- scroll area -->
        <section class="relative flex flex-col w-full">
          <input
            v-on:change="logoChange($event)"
            required=""
            class="absolute inset-0 w-full opacity-0"
            type="file"
          />
          <header
            class="flex flex-col items-center justify-center py-12 border-2 border-gray-400 border-dashed  rounded-2xl"
          >
            <p
              v-if="!logo"
              class="flex flex-wrap justify-center mb-3 font-semibold text-center text-gray-900 "
            >
              <span>Drag and drop your</span>&nbsp;<span>files here or</span>
            </p>
            <p
              v-if="logo"
              class="flex flex-wrap justify-center mb-3 font-semibold text-center text-gray-900 "
            >
              <span>Currently selected file {{ logo.name }}</span>
            </p>
            <button
              type="button"
              class="px-3 py-1 mt-2 bg-gray-200 rounded-sm  hover:bg-gray-300 focus:shadow-outline focus:outline-none"
            >
              {{ logo ? "Select different file" : "Select a file" }}
            </button>
          </header>
        </section>
      </div>
      <div class="flex justify-end w-full">
        <button
          :disabled="isSubmitLoading"
          type="submit"
          class="flex items-center justify-center w-full px-6 py-4 space-x-3 font-medium text-white rounded-md shadow-lg  sm:w-auto disabled:opacity-50 bg-pink hover:bg-pink-600"
          style=""
        >
          <svg
            v-if="!isSubmitLoading"
            class="hidden w-5 h-5 text-white sm:block"
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
            class="hidden w-5 h-5 text-white sm:block animate-spin"
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
</template>

<script lang="ts">
import { AppwriteService } from "../services/appwrite";
import Vue from "vue";
import { Models } from "appwrite";

export default Vue.extend({
  layout: "app",
  data() {
    return {
      title: "",
      url: "",
      description: "",
      logo: undefined,
      isSubmitLoading: false,
      didSubmitSucceed: false,
      countryCode: "",
      countries: [],
    } as {
      title: string;
      url: string;
      description: string;
      logo: undefined | File;
      isSubmitLoading: boolean;
      didSubmitSucceed: boolean;
      countryCode: string;
      countries: Models.Country[];
    };
  },
  async mounted() {
    this.countries = await AppwriteService.getCountryList();
  },
  methods: {
    logoChange(e: Event | any) {
      this.logo = e.target.files[0] as File | undefined;
    },
    async onAddProject(e: Event) {
      e.preventDefault();

      if (!this.logo) {
        alert("Logo is required.");
        return;
      }

      this.isSubmitLoading = true;

      const { $id: logoId } = await AppwriteService.uploadImage(this.logo);

      const didSubmitSuccessfully = await AppwriteService.submitProject({
        title: this.title,
        description: this.description,
        githubUrl: this.url,
        logoId,
        countryCode: this.countryCode,
      });

      this.isSubmitLoading = false;

      if (didSubmitSuccessfully) {
        this.didSubmitSucceed = true;
        this.logo = undefined;
        this.url = "";
        this.title = "";
        this.description = "";
        this.countryCode = "";
        window.scrollTo({ top: 0 });
      }
    },
  },
});
</script>