<template>
  <q-layout
    view="hHh lpR fFf"
    class="flex justify-center h-screen py-2  main-q-layout sm:items-center sm:py-0"
  >
    <q-page-container
      class="grid w-full grid-cols-1 mx-2 overflow-hidden rounded-lg  sm:mt-4 q-page-container sm:mx-4 md:grid-cols-2 shadow-pa md:max-w-5xl"
    >
      <section
        class="flex flex-col items-center justify-center  left-section h-500 sm:h-auto"
      >
        <p
          class="mb-4 -mt-10 text-4xl font-semibold text-white sm:mb-8 sm:mt-8"
        >
          {{ appTitle }} xd
        </p>
        <img
          class="text-white h-300"
          :src="mainImg"
          alt="Principal"
          spinner-color="white"
        />

        <p class="mt-2 text-base text-center text-white sm:mt-8">
          Administre de manera óptima su
        </p>
        <p class="-mb-20 text-base text-center text-white sm:mb-8">
          Conjunto Residencial
        </p>
      </section>
      <router-view @mainImage="broadcastMainImage" :year="year" />
    </q-page-container>
  </q-layout>
</template>
<script>
import { computed, onBeforeMount, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { useQuasar } from "quasar";

export default {
  setup() {
    let store = useStore();
    const quasar = useQuasar();
    const year = computed(() => store.getters["storeCommons/currentYear"]);
    const appTitle = computed(() => store.getters["storeCommons/appTitle"]);
    const mainImg = ref(null);
    const broadcastMainImage = (mainImage) => {
      mainImg.value = mainImage;
    };
    // quasar.loadingBar.setDefaults({
    //   color: "purple",
    //   size: "15px",
    //   position: "top",
    // });

    return {
      year,
      mainImg,
      broadcastMainImage,
      appTitle,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-q-layout {
  height: 100vh;
}
.left-section {
  background: linear-gradient(45deg, $accent, $secondary);
}

.q-page-container {
  width: 100%;
}
</style>
