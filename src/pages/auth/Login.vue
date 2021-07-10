<template>
  <section class="flex flex-col items-center justify-center bg-white h-560">
    <p class="mt-8 text-2xl font-extrabold text-pa-primary sm:mt-10">
      Iniciar Sesión con
    </p>
    <div class="flex flex-row mt-3 space-x-2">
      <q-btn
        size="md"
        round
        :disable="isPendingUser"
        color="indigo-10"
        icon="fab fa-facebook-f"
        @click="facebookLogin()"
      >
        <q-tooltip class="bg-indigo-10" anchor="center left" self="center end"
          >Facebook</q-tooltip
        >
      </q-btn>
      <q-btn
        size="md"
        round
        :disable="isPendingUser"
        color="red-10"
        icon="fab fa-google"
        @click="googleLogin()"
      >
        <q-tooltip anchor="center end" self="center left" class="bg-red-10"
          >Google</q-tooltip
        >
      </q-btn>
    </div>
    <p class="mt-3 text-sm font-extrabold text-pa-primary">O con:</p>
    <q-form
      class="max-w-xs mt-3 full-width"
      @submit.prevent="userLoginWithCredentials"
    >
      <q-input
        ref="emailRef"
        v-model="reqLogin.email"
        filled
        type="email"
        label="Correo *"
        hint="Correo Electrónico"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Correo no válido']"
      />

      <q-input
        ref="passwordRef"
        v-model="reqLogin.password"
        class="mt-3"
        filled
        type="password"
        label="Contraseña *"
        hint="Contraseña"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Contraseña no válida',
        ]"
      />

      <div class="flex justify-between row">
        <q-toggle
          v-model="reqLogin.rememberMe"
          color="accent"
          class="text-pa-primary"
          label="Recuerdame"
        />
        <router-link
          to="/auth/recover-account"
          class="
            mt-3
            mr-1.5
            text-xs
            font-extrabold
            text-center
            underline
            text-pa-accent
            hover:text-pa-primary
          "
        >
          OLVIDÉ MI CONTRASEÑA</router-link
        >
      </div>
      <div class="mt-3">
        <q-btn
          :loading="isPendingUser"
          :disable="isPendingUser"
          type="submit"
          color="primary"
          style="width: 150px"
        >
          INGRESAR
          <template v-slot:loading>
            <q-spinner-gears class="on-left" />
            Procesando
          </template></q-btn
        >
        <q-btn
          label="Cancelar"
          type="reset"
          :disable="isPendingUser"
          outline
          style="color: primary"
          class="q-ml-sm"
        />
      </div>
      <br />
      <router-link
        to="/auth/register"
        class="text-sm font-extrabold text-center underline  text-pa-accent hover:text-pa-primary"
      >
        REGISTRAR CUENTA</router-link
      >
    </q-form>
    <p class="mt-4 text-xs text-center text-gray-500">
      Powered by
      <a
        href="https://www.runcode.co"
        target="_blank"
        class="font-extrabold text-pa-accent"
        >RunCode Ingeniería</a
      >
    </p>
    <p class="text-xs text-center text-gray-500">
      &copy;{{ year }} Todos los Derechos Reservados
    </p>
  </section>
</template>
<script>
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import principalImage from "../../assets/img/auth/login.svg";
import useUser from "../../composables/auth/user";
import { useRouter } from "vue-router";
const constants = require("../../utils/constants/constants");
import { useQuasar } from "quasar";
import { auth, firebase } from "boot/firebase";
export default {
  props: ["year"],
  emits: ["mainImage"],
  setup(props, { emit }) {
    //=======  Init general definitions
    const quaS = useQuasar();
    const reqLogin = reactive({
      email: "",
      password: "",
      rememberMe: true,
    });
    const router = useRouter();
    const error = ref(null);
    const loginSuccess = ref(false);
    const loginSuccessMessage = ref(null);

    const emailIn = ref("");
    const displayName = ref("");
    const tokenId = ref("");
    const providerId = ref("");
    const profileImage = ref(null);

    const {
      checkUserExists,
      userLogin,
      userLogout,
      updateUser,
      isPendingUser,
      generalResponseUser,
    } = useUser();
    //=======  End general definitions

    //=======  Init Login Form Validations
    const emailRef = ref(null);
    const passwordRef = ref(null);
    //=======  End Login Form Validations

    //=======  Init general function definitions
    const userLoginWithCredentials = async () => {
      error.value = null;
      await checkUserExists(reqLogin.email);
      if (generalResponseUser.value.success === true) {
        if (generalResponseUser.value.data.origin) {
          const originDatabase = generalResponseUser.value.data.origin;
          if (originDatabase !== constants.MAIN_ORIGIN) {
            if (originDatabase === constants.GOOGLE_ORIGIN) {
              error.value = `Usuario registrado con Google. Por favor Iniciar Sesión con esta Red Social`;
            } else {
              if (originDatabase === constants.FACEBOOK_ORIGIN) {
                error.value = `Usuario registrado con Facebook. Por favor Iniciar Sesión con esta Red Social`;
              }
            }
          } else {
            await userLogin(reqLogin.email, reqLogin.password);
            if (generalResponseUser.value.success === true) {
              if (
                generalResponseUser.value.data &&
                generalResponseUser.value.data.user &&
                generalResponseUser.value.data.user.emailVerified
              ) {
                updateUser(reqLogin.email, null, new Date(), null);
                reqLogin.email = "";
                reqLogin.password = "";
                emailRef.value.resetValidation();
                passwordRef.value.resetValidation();
                router.push({ name: "Home" });
              } else {
                error.value =
                  "Para Iniciar Sesión por favor confirmar su cuenta a través del correo enviado. Si no ha recibido el correo, ingrese en la opción Olvidé mi Contraseña";
                await userLogout();
              }
            } else {
              if (generalResponseUser.value.apiError) {
                error.value = generalResponseUser.value.apiError.messageUser;
              }
            }
          }
        }
      } else {
        if (generalResponseUser.value.apiError) {
          if (
            generalResponseUser.value.apiError.code === "E_ACCESS_CONTROL_MS_14"
          ) {
            error.value =
              "Usuario no existe en el sistema. Por favor Registrarse";
          } else {
            error.value = generalResponseUser.value.apiError.messageUser;
          }
        } else {
          error.value =
            "Usuario no existe en el sistema. Por favor Registrarse";
        }
      }
      if (error.value) {
        reqLogin.password = null;
        reqLogin.rememberMe = false;
        passwordRef.value.resetValidation();
        quaS.notify({
          type: "warning",
          message: error.value,
          timeout: 10000,
        });
      }
    };

    const userLoginWithSocialNetworks = async () => {
      error.value = null;
      await checkUserExists(emailIn.value);
      if (generalResponseUser.value.success === true) {
        const originDatabase = generalResponseUser.value.data.origin;
        if (originDatabase !== constants.MAIN_ORIGIN) {
          if (providerId.value.toUpperCase() === originDatabase.toUpperCase()) {
            router.push({ name: "Home" });
          } else {
            if (originDatabase === constants.GOOGLE_ORIGIN) {
              error.value = `Usuario registrado previamente con Google. Por favor Iniciar Sesión con esta red social`;
            }
            if (originDatabase === constants.FACEBOOK_ORIGIN) {
              error.value = `Usuario registrado previamente con Facebook. Por favor Iniciar Sesión con esta red social`;
            }
          }
        } else {
          if (originDatabase === constants.MAIN_ORIGIN) {
            error.value = `Usuario registrado previamente con correo y contraseña. Por favor Iniciar Sesión de la manera habitual.`;
          }
        }
      } else {
        if (generalResponseUser.value.apiError) {
          if (
            generalResponseUser.value.apiError.code === "E_ACCESS_CONTROL_MS_14"
          ) {
            error.value =
              "Usuario no existe en el sistema. Por favor Registrarse";
          } else {
            error.value = generalResponseUser.value.apiError.messageUser;
          }
        } else {
          error.value =
            "Usuario no existe en el sistema. Por favor Registrarse";
        }
      }
      if (error.value) {
        reqLogin.password = null;
        reqLogin.rememberMe = false;
        passwordRef.value.resetValidation();
        quaS.notify({
          type: "warning",
          message: error.value,
          timeout: 10000,
        });
      }
    };

    const googleLogin = async () => {
      isPendingUser.value = true;
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    };

    const facebookLogin = async () => {
      isPendingUser.value = true;
      let provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    };

    onBeforeMount(() => {
      emit("mainImage", principalImage);
      isPendingUser.value = true;
    });

    onMounted(() => {
      auth
        .getRedirectResult()
        .then(function (result) {
          if (result.user) {
            if (result.additionalUserInfo) {
              providerId.value = result.additionalUserInfo.providerId;
            }
            if (result.user.za) {
              tokenId.value = result.user.za;
            }
            emailIn.value = result.user.email;
            if (result.user.photoURL) {
              if (result.user.photoURL.includes("facebook.com")) {
                profileImage.value = result.user.photoURL + "?height=500";
              } else {
                if (result.user.photoURL.includes("googleusercontent.com")) {
                  profileImage.value = result.user.photoURL.replace(
                    "s96-c",
                    "s400-c"
                  );
                } else profileImage.value = result.user.photoURL;
              }
            }
            displayName.value = result.user.displayName;
            userLoginWithSocialNetworks();
          } else {
            isPendingUser.value = false;
          }
        })
        .catch(function (error) {
          console.log(error);
          isPendingUser.value = false;
        });
    });
    //=======  End general function definitions
    return {
      reqLogin,
      error,
      loginSuccess,
      loginSuccessMessage,
      isPendingUser,
      emailIn,
      displayName,
      tokenId,
      providerId,
      profileImage,
      quaS,
      emailRef,
      passwordRef,
      facebookLogin,
      googleLogin,
      userLoginWithCredentials,
    };
  },
};
</script>
