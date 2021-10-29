export default async function ({ redirect, store }) {
  await store.dispatch("updateAuthentificationStatus");

  if (store.state.authentificated) {
    return redirect("/app");
  } else {
    // OK
  }
}
