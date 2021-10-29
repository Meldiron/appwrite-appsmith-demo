export default async function ({ redirect, store }) {
  await store.dispatch("updateAuthentificationStatus");

  if (store.state.authentificated) {
    // OK
  } else {
    return redirect("/login");
  }
}
