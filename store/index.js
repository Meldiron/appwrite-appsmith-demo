import { Appwrite } from "appwrite";

const sdk = new Appwrite();
sdk.setEndpoint("https://demo.appwrite.io/v1").setProject("617b90031d1f8");
const appUrl = "http://localhost:3000";

const collections = {
  projects: "617ba048311ab",
};

export const state = () => ({
  authentificated: false,
  userId: null,
  isLoadingPosts: true,
  posts: [],
});

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
  setPosts(state, postsArray) {
    state.posts = postsArray;
  },
  setUserId(state, userId) {
    state.userId = userId;
  },
};

export const actions = {
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

  async forceRefreshProjects({ commit }) {
    // commit("setPostsLoading", true);

    try {
      const [response, trendingResponse] = await Promise.all([
        sdk.database.listDocuments(
          collections.projects,
          ["trending=0"],
          undefined,
          undefined,
          "createdAt",
          "DESC"
        ),
        sdk.database.listDocuments(
          collections.projects,
          ["trending=1"],
          1,
          undefined,
          "createdAt",
          "DESC"
        ),
      ]);

      commit("setPosts", [
        ...trendingResponse.documents,
        ...response.documents,
      ]);
    } catch (err) {
      console.error(err);
      alert("Could not load posts. Please try again later");
    }

    commit("setPostsLoading", false);
  },

  async submitProject(
    { commit, dispatch, state },
    { title, githubUrl, description }
  ) {
    try {
      await sdk.database.createDocument(
        collections.projects,
        {
          title,
          githubUrl,
          description,
          authorId: state.userId,
          createdAt: Date.now(),
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
};
