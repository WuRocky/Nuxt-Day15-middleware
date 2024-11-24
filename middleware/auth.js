export default defineNuxtRouteMiddleware(async () => {
  const nuxtApp = useNuxtApp();
  if (
    import.meta.client &&
    nuxtApp.isHydrating &&
    nuxtApp.payload.serverRendered
  ) {
    return;
  }

  const token = useCookie("auth");
  if (!token.value) return navigateTo("/login");

  try {
    await $fetch("https://nuxr3.zeabur.app/api/v1/user/check", {
      method: "GET",
      headers: {
        Authorization: token.value,
      },
    });
  } catch (error) {
    return navigateTo("/login");
  }
});