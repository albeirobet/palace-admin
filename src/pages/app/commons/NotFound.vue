<template>
  <section
    class="flex flex-col items-center justify-center bg-white h-400 sm:h-500"
  >
    <p class="mt-8 text-2xl font-semibold text-pa-font sm:mt-10">
      ¡Recurso no Encontrado!
    </p>
    <p class="mx-1.5 mt-3 text-sm text-center text-pa-font">
      No fue posible localizar el recurso solicitado en el servidor. Por favor
      valide el origen y destino.
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
import { onBeforeMount } from "vue";
import principalImage from "../../../assets/img/app/not_found.svg";
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
