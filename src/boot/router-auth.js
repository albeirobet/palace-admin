import { boot } from "quasar/wrappers";
import { auth, firebase } from "boot/firebase";
import useUser from "../composables/auth/user";
import { LoadingBar } from "quasar";
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ router }) => {
  router.beforeEach(async (to, from, next) => {
    console.log("Empecé a cargar");
    LoadingBar.setDefaults({
      color: "accent",
      size: "6px",
      position: "bottom",
    });
    LoadingBar.start();
    const userAuth = await firebase.getCurrentUser();
    if (!to.fullPath.startsWith("/auth")) {
      const requireAuth = to.meta.requireAuth;
      let authorizedRoles = null;
      if (to.meta.authorizedRoles) {
        authorizedRoles = to.meta.authorizedRoles;
      }

      if (requireAuth) {
        if (userAuth) {
          if (authorizedRoles) {
            auth.currentUser.getIdTokenResult().then((tokenResult) => {
              const claims = tokenResult.claims;
              if (checkRole(authorizedRoles, claims)) {
                next();
              } else {
                next("/forbidden");
              }
            });
          } else {
            next();
          }
        } else {
          next("/auth");
        }
      } else {
        next();
      }
    } else {
      const { checkUserExists, generalResponseUser } = useUser();
      if (userAuth) {
        await checkUserExists(userAuth.email);
        if (
          generalResponseUser.value.success === true &&
          generalResponseUser.value.data &&
          generalResponseUser.value.data.email_verified
        ) {
          next("/app/user/home");
        } else {
          next();
        }
      } else {
        next();
      }
    }
  });
  router.afterEach(() => {
    LoadingBar.stop();
  });
});

function checkRole(authorizedRoles, claims) {
  let flag = false;
  Object.keys(authorizedRoles).forEach((e) => {
    let role = authorizedRoles[e];
    Object.keys(claims).forEach((e) => {
      let claimKey = e;
      let claimValue = claims[e];
      if (claimKey === role && claimValue) {
        flag = true;
      }
    });
  });
  return flag;
}
