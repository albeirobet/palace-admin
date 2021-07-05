<template>
  <section class="flex flex-col items-center justify-center bg-white h-500">
    <p class="mt-8 text-2xl font-extrabold text-pa-primary sm:mt-10">
      Recuperar Cuenta
    </p>
    <p class="mt-3 text-sm font-extrabold text-center text-pa-primary">
      Si posee una cuenta registrada con correo electrónico por favor ingreselo
      a continuación
    </p>
    <q-form class="max-w-xs mt-3 full-width">
      <q-input
        filled
        type="email"
        label="Correo *"
        hint="Correo Electrónico"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Correo no válido']"
      />
      <div class="mt-3">
        <q-btn label="Recuperar" type="submit" color="primary" />
        <q-btn
          label="Cancelar"
          type="reset"
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
          text-pa-primary
          hover:text-pa-accent
        "
      >
        Iniciar Sesión</router-link
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
import { onBeforeMount } from "vue";
import principalImage from "../../assets/img/recover_account.svg";
export default {
  props: ["year"],
  emits: ["mainImage"],
  setup(props, { emit }) {
    onBeforeMount(() => {
      emit("mainImage", principalImage);
    });
    return {};
  },
};
</script>
