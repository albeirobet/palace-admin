<template>
  <div class="container p-2 mt-1">
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-8 lg:grid-cols-2">
      <span class="p-2 bg-blue-500 sm:bg-green-500 md:bg-red-500">Hola</span>
      <span class="p-2 bg-blue-500 sm:bg-yellow-500 md:bg-pink-500">Mundo</span>
      <img :src="colorAvatar" alt="Logo" class="w-10 sm:w-20 md:w-40 lg:w-60" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const quasar = useQuasar();
    const store = useStore();
    const colorAvatar = computed(
      () => store.getters["storeCommons/colorAvatar"]
    );
    quasar.loadingBar.stop();
    return {
      colorAvatar,
    };
  },
};
</script>
