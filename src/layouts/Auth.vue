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
          class="mb-4 -mt-10 text-4xl font-extrabold text-white sm:mb-8 sm:mt-8"
        >
          PALACE ADMIN
        </p>
        <img class="h-300" :src="mainImg" alt="sdgfsd" />

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
export default {
  setup() {
    const year = new Date().getFullYear();
    const mainImg = ref(null);
    const broadcastMainImage = (mainImage) => {
      mainImg.value = mainImage;
    };

    return {
      year,
      mainImg,
      broadcastMainImage,
    };
  },
};
</script>

<style lang="scss" scoped>
.main-q-layout {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}
.left-section {
  background: linear-gradient(45deg, $accent, $quaternary);
}

.q-page-container {
  width: 100%;
}
</style>
