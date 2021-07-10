<template>
  <h1 class="text-pa-primary">Home!!!</h1>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    const quasar = useQuasar();
    const store = useStore();
    quasar.loadingBar.stop();
    return {};
  },
};
</script>
