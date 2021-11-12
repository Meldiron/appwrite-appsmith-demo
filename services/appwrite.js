import { Appwrite } from "appwrite";

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.appwriteEndpoint) // https://demo.appwrite.io/v1
  .setProject(process.env.appwriteProjectId); // 617b90031d1f8

const appUrl = process.env.baseUrl; // http://localhost:3000

const collections = {
  projects: process.env.collectionProjects, // 617ba048311ab
};

const paginationPerPage = 1;

export const AppwriteService = {
  async getAuthStatus() {
    try {
      await sdk.account.get();
      return true;
    } catch (err) {
      return false;
    }
  },

  async getCountryList() {
    const countryResponse = await sdk.locale.getCountries();
    return countryResponse.countries;
  },

  async logout() {
    try {
      await sdk.account.deleteSession("current");
      return true;
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      return false;
    }
  },

  async login() {
    await sdk.account.createOAuth2Session(
      "github",
      `${appUrl}/app?alert=1`,
      `${appUrl}/login?alert=1`
    );
  },

  async uploadImage(file) {
    return await sdk.storage.createFile(file, ["*"]);
  },

  async submitProject({ title, githubUrl, description, logoId, countryCode }) {
    try {
      const user = await sdk.account.get();

      await sdk.database.createDocument(
        collections.projects,
        {
          title,
          githubUrl,
          description,
          logoId,
          authorId: user.$id,
          createdAt: Date.now(),
          countryCode,
        },
        ["*"]
      );

      return true;
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again later.");
      return false;
    }
  },

  async initPostsSubscription(callback) {
    sdk.subscribe(`collections.${collections.projects}.documents`, (data) => {
      if (data.event !== "database.documents.create") {
        return;
      }

      const post = data.payload;

      callback({
        url: post.githubUrl,
        text: post.title,
      });
    });
  },

  async getTrendingProjects() {
    // Maximum 5 trending will be displayed. No pagination.
    const postsResponse = await sdk.database.listDocuments(
      collections.projects,
      ["trending=1"],
      5,
      undefined,
      "createdAt",
      "DESC"
    );

    return postsResponse.documents;
  },

  async getProjects(page) {
    try {
      const postsResponse = await sdk.database.listDocuments(
        collections.projects,
        ["trending=0"],
        paginationPerPage,
        (page - 1) * paginationPerPage,
        "createdAt",
        "DESC"
      );

      return postsResponse;
    } catch (err) {
      console.error(err);
      alert("Could not load posts. Please try again later");
    }
  },

  getImageThumbnail(fileId, index) {
    return sdk.storage.getFilePreview(
      fileId,
      400,
      400,
      "center",
      undefined,
      undefined,
      undefined,
      40,
      undefined,
      index % 2 == 0 ? 6 : 354
    );
  },
};
