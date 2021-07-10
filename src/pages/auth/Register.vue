<template>
  <section class="flex flex-col items-center bg-white h-720">
    <p class="mt-8 text-2xl font-extrabold text-pa-primary sm:mt-10">
      Registrarse con
    </p>
    <div class="flex flex-row mt-3 space-x-2">
      <q-btn
        size="md"
        :disable="isPendingUser"
        round
        color="indigo-10"
        icon="fab fa-facebook-f"
        @click="facebookSignUp()"
      >
        <q-tooltip class="bg-indigo-10" anchor="center left" self="center end"
          >Facebook</q-tooltip
        >
      </q-btn>
      <q-btn
        size="md"
        :disable="isPendingUser"
        round
        color="red-10"
        icon="fab fa-google"
        @click="googleSignUp()"
      >
        <q-tooltip anchor="center end" self="center left" class="bg-red-10"
          >Google</q-tooltip
        >
      </q-btn>
    </div>
    <p class="mt-3 text-sm font-extrabold text-pa-primary">O con:</p>
    <q-form
      class="max-w-xs mt-3 full-width"
      @submit.prevent="userRegisterWithCredentials"
    >
      <q-input
        ref="displayNameRef"
        filled
        type="text"
        label="Nombre *"
        hint="Nombre Completo"
        v-model="reqRegister.displayName"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Nombre no válido']"
      />
      <q-input
        ref="emailRef"
        class="mt-3"
        filled
        type="email"
        label="Correo *"
        hint="Correo Electrónico"
        v-model="reqRegister.email"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Correo no válido']"
      />

      <q-input
        ref="passwordRef"
        class="mt-3"
        filled
        type="password"
        label="Contraseña *"
        hint="Contraseña"
        v-model="reqRegister.password"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Contraseña no válida',
        ]"
      />

      <div class="mt-4">
        <span class="text-center text-pa-primary"
          >Al <span class="font-extrabold text-pa-accent">REGISTRARSE</span>,
          declara haber leído y aceptado la
          <a
            href="#"
            class="font-extrabold underline  text-pa-accent hover:text-pa-primary"
            >Política de Tratamiento de Datos</a
          >
          y los
          <a
            href="#"
            class="font-extrabold underline  text-pa-accent hover:text-pa-primary"
            >Terminos y Condiciones de Uso</a
          >
        </span>
        <br />
        <q-btn
          class="mt-4"
          :loading="isPendingUser"
          :disable="isPendingUser"
          type="submit"
          color="primary"
          style="width: 150px"
        >
          REGISTRARSE
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
          class="mt-4 q-ml-sm"
        />
      </div>
      <br />
      <router-link
        to="/auth/login"
        class="text-sm font-extrabold text-center underline  text-pa-accent hover:text-pa-primary"
      >
        INICIAR SESIÓN</router-link
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
import principalImage from "../../assets/img/auth/register.svg";
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
    const reqRegister = reactive({
      displayName: "",
      email: "",
      password: "",
    });

    const router = useRouter();
    const error = ref(null);
    const registerSuccess = ref(false);
    const registerSuccessMessage = ref(null);

    const emailIn = ref("");
    const displayName = ref("");
    const tokenId = ref("");
    const providerId = ref("");
    const profileImage = ref(null);

    const {
      checkUserExists,
      userSignUp,
      userLogout,
      isPendingUser,
      generalResponseUser,
    } = useUser();
    //=======  End general definitions

    //=======  Init Form Validations general definitions
    const displayNameRef = ref(null);
    const emailRef = ref(null);
    const passwordRef = ref(null);
    //=======  End Form Validations

    //=======  Init general function definitions
    const userRegisterWithCredentials = async () => {
      registerSuccess.value = false;
      registerSuccessMessage.value = null;
      await checkUserExists(reqRegister.email);
      if (generalResponseUser.value.success === true) {
        const originDatabase = generalResponseUser.value.data.origin;
        if (originDatabase !== constants.MAIN_ORIGIN) {
          if (originDatabase === constants.GOOGLE_ORIGIN) {
            error.value = `Usuario registrado previamente con Google. Por favor Iniciar Sesión con esta Red Social`;
          }
          if (originDatabase === constants.FACEBOOK_ORIGIN) {
            error.value = `Usuario registrado previamente con Facebook. Por favor Iniciar Sesión con esta Red Social`;
          }
        } else {
          if (originDatabase === constants.MAIN_ORIGIN) {
            error.value = `Usuario registrado previamente con correo y contraseña. Por favor Iniciar Sesión de la manera habitual.`;
          }
        }
      } else {
        await userSignUp(
          reqRegister.email,
          reqRegister.password,
          reqRegister.displayName,
          null
        );
        if (generalResponseUser.value.success === true) {
          await userLogout();
          registerSuccess.value = true;
          registerSuccessMessage.value =
            " Hemos enviado un enlace a su dirección de correo electrónico con el cual podrá confirmar su cuenta y acceder al sistema.";
          reqRegister.email = "";
          reqRegister.password = "";
          reqRegister.displayName = "";
          reqRegister.passwordConfirm = "";
          reqRegister.termsAndConditions = "";
          reqRegister.dataTreatment = "";
        }
      }
      if (error.value) {
        quaS.notify({
          type: "warning",
          message: error.value,
          timeout: 10000,
        });
      }
      if (registerSuccessMessage.value) {
        quaS.notify({
          type: "positive",
          message: registerSuccessMessage.value,
          timeout: 10000,
        });
        displayNameRef.value.resetValidation();
        emailRef.value.resetValidation();
        passwordRef.value.resetValidation();
      }
    };

    const userRegisterWithSocialNetworks = async () => {
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
        await firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(function (idToken) {
            tokenId.value = idToken;
          })
          .catch(function (error) {
            // Handle error
          });
        await userSignUp(null, null, null, tokenId.value);
        if (generalResponseUser.value.success === true) {
          quaS.notify({
            type: "positive",
            message: "Registro correcto. Bienvenid@",
            timeout: 5000,
          });
          router.push({ name: "Home" });
        } else {
          console.log(generalResponseUser.value);
        }
      }
      if (error.value) {
        quaS.notify({
          type: "warning",
          message: error.value,
          timeout: 10000,
        });
      }
    };

    const facebookSignUp = async () => {
      let provider = new firebase.auth.FacebookAuthProvider();
      auth.signInWithRedirect(provider);
    };

    const googleSignUp = async () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
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
            userRegisterWithSocialNetworks();
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

    //=======  Return section
    return {
      reqRegister,
      error,
      registerSuccess,
      registerSuccessMessage,
      userRegisterWithCredentials,
      isPendingUser,
      emailIn,
      displayName,
      tokenId,
      providerId,
      profileImage,
      quaS,
      displayNameRef,
      emailRef,
      passwordRef,
      facebookSignUp,
      googleSignUp,
    };
    //=======  End Return section
  },
};
</script>
