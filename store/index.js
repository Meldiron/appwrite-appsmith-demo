import { Appwrite } from "appwrite";

const paginationPerPage = 10;
let didSubscribe = false;

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.appwriteEndpoint)
  .setProject(process.env.appwriteProjectId);
const appUrl = process.env.baseUrl;

const collections = {
  projects: process.env.collectionProjects,
};

export const state = () => {
  return {
    authentificated: false,
    userId: null,
    isLoadingPosts: true,
    posts: [],
    trendingPosts: [],
    countries: [],
    projectsSum: null,
    projectOffset: 0,
    postsPaginationLoading: false,
    realtimeData: null,
  };
};

export const getters = {
  allPosts: (state) => {
    return [...state.trendingPosts, ...state.posts];
  },
};

export const mutations = {
  setUnauthentificated(state) {
    state.authentificated = false;
  },
  setAuthentificated(state) {
    state.authentificated = true;
  },
  setPostsLoading(state, status) {
    state.isLoadingPosts = status;
  },
  setProjectsSum(state, sum) {
    state.projectsSum = sum;
  },
  setPosts(state, postsArray) {
    state.posts = postsArray;
  },
  setTrendingPosts(state, postsArray) {
    state.trendingPosts = postsArray;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
  resetOffset(state) {
    state.projectOffset = 0;
  },
  increaseOffset(state) {
    state.projectOffset += paginationPerPage;
  },
  setPostsPaginationLoading(state, isLoading) {
    state.postsPaginationLoading = isLoading;
  },
  setCountries(state, countries) {
    state.countries = countries;
  },
  addPosts(state, posts) {
    state.posts = [...state.posts, ...posts];
  },
  setRealtimeData(state, data) {
    state.realtimeData = data;
  },
};

export const actions = {
  async initSubscriptions({ dispatch }) {
    if (didSubscribe) {
      return;
    }

    didSubscribe = true;
    sdk.subscribe(`collections.${collections.projects}.documents`, (data) => {
      // if(data.event !== "database.documents.create") {
      //   return;
      // }

      const post = data.payload;
      dispatch("showRelatimeAlert", {
        url: post.githubUrl,
        text: post.title,
      });
    });
  },
  async loginUsingGitHub({ commit }) {
    await sdk.account.createOAuth2Session(
      "github",
      `${appUrl}/app?alert=1`,
      `${appUrl}/login?alert=1`
    );
  },

  async updateAuthentificationStatus({ commit }) {
    try {
      const response = await sdk.account.get();
      commit("setUserId", response.$id);
      commit("setAuthentificated");
    } catch (err) {
      commit("setUnauthentificated");
    }
  },

  async uploadLogo({ commit }, file) {
    const fileResponse = await sdk.storage.createFile(file, ["*"]);
    return fileResponse;
  },

  async loadNextProjectsPage({ commit, state }) {
    commit("increaseOffset", true);
    commit("setPostsPaginationLoading", true);

    try {
      const response = await sdk.database.listDocuments(
        collections.projects,
        ["trending=0"],
        paginationPerPage,
        state.projectOffset,
        "createdAt",
        "DESC"
      );

      const mapFunction = (post, postIndex) => {
        return {
          ...post,
          logoUrl: sdk.storage.getFilePreview(
            post.logoId,
            400,
            400,
            "center",
            undefined,
            undefined,
            undefined,
            40,
            undefined,
            postIndex % 2 == 0 ? 6 : 354
          ),
        };
      };

      commit("addPosts", response.documents.map(mapFunction));
      commit("setProjectsSum", response.sum);
    } catch (err) {
      console.error(err);
      alert("Could not load posts. Please try again later");
    }

    commit("setPostsPaginationLoading", false);
  },

  async forceRefreshProjects({ commit, state }) {
    commit("setPostsLoading", true);
    commit("setProjectsSum", null);
    commit("resetOffset");
    commit("setPostsPaginationLoading", false);

    // Maximum 5 trending will be displayed. No pagination.
    try {
      const [response, trendingResponse] = await Promise.all([
        sdk.database.listDocuments(
          collections.projects,
          ["trending=0"],
          paginationPerPage,
          state.projectOffset,
          "createdAt",
          "DESC"
        ),
        sdk.database.listDocuments(
          collections.projects,
          ["trending=1"],
          5,
          undefined,
          "createdAt",
          "DESC"
        ),
      ]);

      const mapFunction = (post, postIndex) => {
        return {
          ...post,
          logoUrl: sdk.storage.getFilePreview(
            post.logoId,
            400,
            400,
            "center",
            undefined,
            undefined,
            undefined,
            40,
            undefined,
            postIndex % 2 == 0 ? 6 : 354
          ),
        };
      };

      commit("setPosts", response.documents.map(mapFunction));
      commit("setTrendingPosts", trendingResponse.documents.map(mapFunction));
      commit("setProjectsSum", response.sum);
    } catch (err) {
      console.error(err);
      alert("Could not load posts. Please try again later");
    }

    commit("setPostsLoading", false);
  },

  async refreshCountryList({ commit }) {
    const countryResponse = await sdk.locale.getCountries();
    commit("setCountries", countryResponse.countries);
  },

  async submitProject(
    { commit, dispatch, state },
    { title, githubUrl, description, logoId, countryCode }
  ) {
    try {
      await sdk.database.createDocument(
        collections.projects,
        {
          title,
          githubUrl,
          description,
          logoId,
          authorId: state.userId,
          createdAt: Date.now(),
          countryCode,
        },
        ["*"]
      );

      // alert("Successfully submited the project!");

      dispatch("forceRefreshProjects"); // async, don't await
      return true;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
      return false;
    }
  },

  async logout() {
    try {
      await sdk.account.deleteSession("current");
    } catch (err) {
      alert("Something went wrong. Please try again later.");
    }
  },

  async showRelatimeAlert({ commit }, data) {
    commit("setRealtimeData", null);

    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 50);
    });

    commit("setRealtimeData", data);

    await new Promise((res) => {
      setTimeout(() => {
        res(true);
      }, 5000);
    });

    commit("setRealtimeData", null);
  },
};
