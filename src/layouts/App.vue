<template>
  <q-layout view="lHh lpR lFf">
    <Header />
    <Drawer />
    <q-page-container>
      <q-page padding>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineAsyncComponent, onBeforeMount } from "vue";
import { useStore } from "vuex";

const Header = defineAsyncComponent(() =>
  import("../components/app/commons/Header.vue")
);
const Drawer = defineAsyncComponent(() =>
  import("../components/app/commons/Drawer.vue")
);

export default {
  components: { Header, Drawer },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch("storeCommons/handleAuthStateChange");
    });

    return {};
  },
};
</script>
