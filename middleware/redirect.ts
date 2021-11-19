import { Middleware } from "@nuxt/types";
import { AppwriteService } from "../services/appwrite";

const middleware: Middleware = async ({ redirect }) => {
  const isLoggedIn = await AppwriteService.getAuthStatus();

  if (isLoggedIn) {
    return redirect("/app");
  } else {
    return redirect("/login");
  }
};

export default middleware;
