import { AppwriteService } from "../services/appwrite";

export default async function ({ redirect }) {
  const isLoggedIn = await AppwriteService.getAuthStatus();

  if (isLoggedIn) {
    // OK
  } else {
    return redirect("/login");
  }
}
