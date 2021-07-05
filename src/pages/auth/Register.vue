<template>
  <section class="flex flex-col items-center justify-center bg-white h-700">
    <p class="mt-8 text-2xl font-extrabold text-pa-primary sm:mt-10">
      Registrarse con
    </p>
    <div class="flex flex-row mt-3 space-x-2">
      <q-btn size="md" round color="indigo-10" icon="fab fa-facebook-f">
        <q-tooltip class="bg-indigo-10" anchor="center left" self="center end"
          >Facebook</q-tooltip
        >
      </q-btn>
      <q-btn size="md" round color="red-10" icon="fab fa-google">
        <q-tooltip anchor="center end" self="center left" class="bg-red-10"
          >Google</q-tooltip
        >
      </q-btn>
    </div>
    <p class="mt-3 text-sm font-extrabold text-pa-primary">O con:</p>
    <q-form class="max-w-xs mt-3 full-width">
      <q-input
        filled
        type="text"
        label="Nombre *"
        hint="Nombre Completo"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Nombre no válido']"
      />
      <q-input
        class="mt-3"
        filled
        type="email"
        label="Correo *"
        hint="Correo Electrónico"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Correo no válido']"
      />

      <q-input
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
      <q-input
        class="mt-3"
        filled
        type="password"
        label="Confirmar contraseña *"
        hint="Confirmar ontraseña"
        lazy-rules
        :rules="[
          (val) => (val !== null && val !== '') || 'Contraseña no válida',
        ]"
      />

      <div class="mt-6">
        <q-btn label="Registrarse" type="submit" color="primary" />
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
        class="text-sm font-extrabold text-center underline  text-pa-primary hover:text-pa-accent"
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
import principalImage from "../../assets/img/register.svg";
export default {
  props: ["year"],
  emits: ["mainImage"],
  setup(props, { emit }) {
    onBeforeMount(() => {
      console.log("Antes de montar el login");
      emit("mainImage", principalImage);
    });
    return {};
  },
};
</script>
