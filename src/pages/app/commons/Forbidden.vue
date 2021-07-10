<template>
  <section
    class="flex flex-col items-center justify-center bg-white h-400 sm:h-500"
  >
    <p class="mt-8 text-2xl font-extrabold text-pa-primary sm:mt-10">
      ¡Recurso No Autorizado!
    </p>
    <p class="mx-1.5 mt-3 text-sm text-center text-pa-primary">
      El recurso al cual está intentando acceder es Protegido
    </p>
    <q-btn
      to="/app/user/home"
      color="primary"
      class="mt-4"
      style="width: 150px"
    >
      IR AL INICIO
    </q-btn>

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
import principalImage from "../../../assets/img/app/forbidden.svg";
export default {
  props: ["year"],
  emits: ["mainImage"],
  setup(props, { emit }) {
    //=======  Init general function definitions
    onBeforeMount(() => {
      emit("mainImage", principalImage);
    });
    //=======  End general function definitions
  },
};
</script>
