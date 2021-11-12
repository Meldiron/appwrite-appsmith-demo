import { AppwriteService } from "../services/appwrite";

export default async function ({ redirect }) {
  const isLoggedIn = await AppwriteService.getAuthStatus();

  if (isLoggedIn) {
    return redirect("/app");
  } else {
    // OK
  }
}
