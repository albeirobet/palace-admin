<template>
  <section
    class="flex flex-col items-center justify-center bg-white h-400 sm:h-500"
  >
    <p class="mt-8 text-2xl font-semibold text-pa-font sm:mt-10">
      {{ accountAccountActionsTitle }}
    </p>
    <p
      class="mx-1.5 mt-3 text-sm text-center text-pa-font"
      v-if="!accountActionsResetPassword"
    >
      {{ accountAccountActionsMessage }}
    </p>
    <q-form
      v-if="accountActionsResetPassword"
      class="max-w-xs mt-3 full-width"
      @submit.prevent="resetPassword()"
    >
      <q-input
        ref="passwordRef"
        v-model="reqResetPassword.password"
        class="mt-3"
        filled
        type="password"
        label="Nueva contraseña *"
        hint="Nueva contraseña"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Nueva contraseña no válida',
        ]"
      />
      <q-input
        ref="passwordConfirmRef"
        v-model="reqResetPassword.passwordConfirm"
        class="mt-3"
        filled
        type="password"
        label="Confirmar nueva contraseña *"
        hint="Confirmar nueva contraseña"
        lazy-rules
        :rules="[
          (val) =>
            (val !== null && val !== '') || 'Contraseña confirmada no válida',
        ]"
      />

      <div class="mt-3">
        <q-btn
          :loading="isPendingResetPassword"
          :disable="isPendingResetPassword"
          type="submit"
          color="primary"
          style="width: 150px"
        >
          RESTABLECER
          <template v-slot:loading>
            <q-spinner-gears class="on-left" />
            Procesando
          </template></q-btn
        >
        <q-btn
          label="Cancelar"
          type="reset"
          :disable="isPendingResetPassword"
          outline
          style="color: primary"
          class="q-ml-sm"
        />
      </div>
    </q-form>
    <router-link
      to="/auth/login"
      class="
        mt-3
        text-sm
        font-semibold
        text-center
        underline
        text-pa-accent
        hover:text-pa-font
      "
    >
      INICIAR SESIÓN</router-link
    >
    <p class="mt-4 text-xs text-center text-gray-500">
      Powered by
      <a
        href="https://www.runcode.co"
        target="_blank"
        class="font-semibold text-pa-accent"
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
import principalImage from "../../assets/img/auth/account_actions.svg";
import useUser from "../../composables/auth/user";
import { useQuasar } from "quasar";
import { auth, firebase } from "boot/firebase";
export default {
  props: ["year"],
  emits: ["mainImage"],
  setup(props, { emit }) {
    //=======  Init general definitions
    const quaS = useQuasar();
    const { updateUser } = useUser();
    const accountAccountActionsIsPending = ref(false);
    const actionCodeResetPassword = ref(null);
    const accountActionsResetPassword = ref(false);
    const accountAccountActionsTitle = ref(null);
    const accountAccountActionsMessage = ref(null);
    const accountAccountActionsError = ref(null);
    const isPendingResetPassword = ref(false);
    accountAccountActionsTitle.value = "Acción en Proceso";
    accountAccountActionsMessage.value =
      "La configuración de su cuenta está en proceso, por favor espere un momento";
    const reqResetPassword = reactive({
      password: "",
      passwordConfirm: "",
    });
    //=======  End general definitions

    //=======  Init Recover Account Form Validations
    const passwordRef = ref(null);
    const passwordConfirmRef = ref(null);
    //=======  End Recover Account Form Validations

    //=======  Init general function definitions
    onMounted(() => {
      accountActionsResetPassword.value = false;
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      // Get the action to complete.
      const mode = params.mode;
      // Get the one-time code from the query parameter.
      const actionCode = params.oobCode;
      // (Optional) Get the continue URL from the query parameter if available.
      const continueUrl = params.continueUrl;
      // (Optional) Get the language code if available.
      const lang = params.lang || "en";

      // Handle the user management action.
      switch (mode) {
        case "resetPassword":
          handleResetPassword(actionCode, continueUrl, lang);
          break;
        case "verifyEmail":
          handleVerifyEmail(actionCode, continueUrl, lang);
          break;
        default:
          accountAccountActionsTitle.value = "Error al Configurar Cuenta";
          accountAccountActionsMessage.value =
            "El código de acción no es válido. Esto puede suceder si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado";
      }
    });

    async function handleResetPassword(actionCode, continueUrl, lang) {
      await firebase
        .auth()
        .verifyPasswordResetCode(actionCode)
        .then((email) => {
          accountActionsResetPassword.value = true;
          actionCodeResetPassword.value = actionCode;
          accountAccountActionsTitle.value = "Restablecer Contraseña";
          accountAccountActionsMessage.value = null;
        })
        .catch((error) => {
          accountAccountActionsTitle.value = "Error al Restablecer Contraseña";
          accountAccountActionsMessage.value =
            "El código de acción no es válido. Esto puede suceder si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado";
        });
    }

    async function resetPassword() {
      isPendingResetPassword.value = true;
      let emailUserUpdate = null;
      await firebase
        .auth()
        .checkActionCode(actionCodeResetPassword.value)
        .then((resp) => {
          emailUserUpdate = resp.data.email;
        })
        .catch((error) => {
          isPendingResetPassword.value = false;
          accountActionsResetPassword.value = false;
          accountAccountActionsTitle.value = "Error al Restablecer Contraseña";
          accountAccountActionsMessage.value =
            "El código de acción no es válido. Esto puede suceder si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado";
        });
      if (emailUserUpdate) {
        await firebase
          .auth()
          .confirmPasswordReset(
            actionCodeResetPassword.value,
            reqResetPassword.password
          )
          .then((resp) => {
            updateUser(emailUserUpdate, null, null, new Date());
            isPendingResetPassword.value = false;
            accountActionsResetPassword.value = false;
            accountAccountActionsTitle.value = "Contraseña Actualizada";
            accountAccountActionsMessage.value =
              "El proceso de restablecimiento de contraseña se realizó correctamente, ahora puede acceder al sistema con su nueva contraseña";
          })
          .catch((error) => {
            isPendingResetPassword.value = false;
            accountActionsResetPassword.value = false;
            accountAccountActionsTitle.value =
              "Error al Restablecer Contraseña";
            accountAccountActionsMessage.value =
              "El código de acción no es válido. Esto puede suceder si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado";
          });
      }
    }

    async function handleVerifyEmail(actionCode, continueUrl, lang) {
      let emailUserUpdate = null;
      await firebase
        .auth()
        .checkActionCode(actionCode)
        .then((resp) => {
          emailUserUpdate = resp.data.email;
        })
        .catch((error) => {
          accountAccountActionsTitle.value = "Error al Confirmar Cuenta";
          accountAccountActionsMessage.value =
            "El código de acción no es válido. Esto puede suceder si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado";
        });
      if (emailUserUpdate) {
        await firebase
          .auth()
          .applyActionCode(actionCode)
          .then((resp) => {
            updateUser(emailUserUpdate, true, null, null);
            accountAccountActionsTitle.value = "Cuenta Confirmada";
            accountAccountActionsMessage.value =
              "El proceso de confirmación se realizó correctamente, ahora puede acceder al sistema";
          })
          .catch((error) => {
            accountAccountActionsTitle.value = "Error al Confirmar Cuenta";
            accountAccountActionsMessage.value =
              "El código de acción no es válido. Esto puede suceder si el código tiene un formato incorrecto, ha caducado o ya se ha utilizado";
          });
      }
    }

    onBeforeMount(() => {
      emit("mainImage", principalImage);
    });
    //=======  End general function definitions

    return {
      accountAccountActionsIsPending,
      accountAccountActionsTitle,
      accountAccountActionsMessage,
      accountAccountActionsError,
      accountActionsResetPassword,
      actionCodeResetPassword,
      reqResetPassword,
      isPendingResetPassword,
      resetPassword,
      passwordRef,
      passwordConfirmRef,
    };
  },
};
</script>
