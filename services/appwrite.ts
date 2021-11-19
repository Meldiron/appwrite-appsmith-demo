import { Appwrite, Models } from "appwrite";

if (!process.env.appwriteEndpoint || !process.env.appwriteProjectId || !process.env.collectionProjects) {
  throw new Error("Appwrite environment variables not properly set!");
}

const sdk = new Appwrite();
sdk
  .setEndpoint(process.env.appwriteEndpoint) // https://demo.appwrite.io/v1
  .setProject(process.env.appwriteProjectId); // 617b90031d1f8

const appUrl = process.env.baseUrl; // http://localhost:3000

const collections = {
  projects: process.env.collectionProjects, // 617ba048311ab
};

const paginationPerPage = 3;

export type AppwritePost = {
  githubUrl: string;
  title: string;
  description: string;
  trending: boolean;
  authorId: string; // user ID
  createdAt: number; // Timestamp
  logoId: string; // Storage file ID
  countryCode: string; // Code from locale.getCountries()
} & Models.Document;

export const AppwriteService = {
  async logout(): Promise<boolean> {
    try {
      await sdk.account.deleteSession("current");
      return true;
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      return false;
    }
  },

  async login(): Promise<void> {
    await sdk.account.createOAuth2Session(
      "github",
      `${appUrl}/app?alert=1`,
      `${appUrl}/login?alert=1`
    );
  },

  async getAuthStatus(): Promise<boolean> {
    try {
      await sdk.account.get();
      return true;
    } catch (err) {
      return false;
    }
  },

  async getCountryList(): Promise<Models.Country[]> {
    const countryResponse = await sdk.locale.getCountries();
    return countryResponse.countries;
  },

  async uploadImage(file: File): Promise<Models.File> {
    return await sdk.storage.createFile(file, ["*"]);
  },

  async submitProject({ title, githubUrl, description, logoId, countryCode }: {
    title: string;
    githubUrl: string;
    description: String;
    logoId: string;
    countryCode: string;
  }): Promise<boolean> {
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

  async getTrendingProjects(): Promise<Models.DocumentList<AppwritePost>> {
    const postsResponse = await sdk.database.listDocuments<AppwritePost>(
      collections.projects,
      ["trending=true"],
      5,
      undefined,
      "createdAt",
      "DESC"
    );

    return postsResponse;
  },

  async getProjects(page: number): Promise<Models.DocumentList<AppwritePost>> {
    const postsResponse = await sdk.database.listDocuments<AppwritePost>(
      collections.projects,
      ["trending=false"],
      paginationPerPage,
      (page - 1) * paginationPerPage,
      "createdAt",
      "DESC"
    );

    return postsResponse;
  },

  getImageThumbnail(fileId: string, index: number): string {
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
    ).toString();
  },

  initPostsSubscription(callback: (payload: { url: string, text: string }) => void): void {
    sdk.subscribe<AppwritePost>(`collections.${collections.projects}.documents`, (data) => {
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
};
