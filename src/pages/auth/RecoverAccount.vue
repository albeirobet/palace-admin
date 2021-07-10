<template>
  <section
    class="flex flex-col items-center justify-center bg-white h-400 sm:h-500"
  >
    <p class="mt-8 text-2xl font-extrabold text-pa-primary sm:mt-10">
      Recuperar Cuenta
    </p>
    <p class="mx-1.5 mt-3 text-sm text-center text-pa-primary">
      Si posee una cuenta registrada con correo electrónico por favor ingreselo
      a continuación
    </p>
    <q-form
      class="max-w-xs mt-3 full-width"
      @submit.prevent="recoveUserAccount"
    >
      <q-input
        ref="emailRef"
        v-model="reqRecoverAccount.email"
        filled
        type="email"
        label="Correo *"
        hint="Correo Electrónico"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Correo no válido']"
      />
      <div class="mt-3">
        <q-btn
          :loading="isPendingUser"
          :disable="isPendingUser"
          type="submit"
          color="primary"
          style="width: 150px"
        >
          RECUPERAR
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
        to="/auth/login"
        class="
          text-sm
          font-extrabold
          text-center
          underline
          text-pa-accent
          hover:text-pa-primary
        "
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
import { onBeforeMount, reactive, ref } from "vue";
import principalImage from "../../assets/img/auth/recover_account.svg";
import useUser from "../../composables/auth/user";
import { useQuasar } from "quasar";
export default {
  props: ["year"],
  emits: ["mainImage"],
  setup(props, { emit }) {
    //=======  Init general definitions
    const quaS = useQuasar();
    const error = ref(null);
    const accountRecoverSuccess = ref(false);
    const accountRecoverMessage = ref(null);
    const { recoverAccount, isPendingUser, generalResponseUser } = useUser();
    const reqRecoverAccount = reactive({
      email: "",
    });
    //=======  End general definitions

    //=======  Init Recover Account Form Validations
    const emailRef = ref(null);
    //=======  End Recover Account Form Validations

    //=======  Init general function definitions
    const recoveUserAccount = async () => {
      error.value = null;
      await recoverAccount(reqRecoverAccount.email);
      if (generalResponseUser.value.success === true) {
        accountRecoverSuccess.value = true;
        accountRecoverMessage.value = generalResponseUser.value.data;
      } else {
        accountRecoverSuccess.value = false;
        accountRecoverMessage.value = "";
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
            "No fue posible restablecer la cuenta. Por favor intente más tarde";
        }
      }
      if (accountRecoverMessage.value) {
        reqRecoverAccount.email = null;
        emailRef.value.resetValidation();
        quaS.notify({
          type: "positive",
          message: accountRecoverMessage.value,
          timeout: 10000,
        });
      }
      if (error.value) {
        reqRecoverAccount.email = null;
        emailRef.value.resetValidation();
        quaS.notify({
          type: "warning",
          message: error.value,
          timeout: 10000,
        });
      }
    };
    //=======  End general function definitions

    onBeforeMount(() => {
      emit("mainImage", principalImage);
    });
    return {
      reqRecoverAccount,
      emailRef,
      isPendingUser,
      recoveUserAccount,
    };
  },
};
</script>
