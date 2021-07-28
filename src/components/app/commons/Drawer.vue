<template>
  <q-drawer
    show-if-above
    v-model="drawerState"
    side="left"
    elevated
    class="bg-primary"
  >
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding class="text-base text-white">
        <q-item
          clickable
          v-ripple
          to="/app/user/home"
          exact
          active-class="menu-link"
        >
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>

          <q-item-section> Inicio </q-item-section>
        </q-item>

        <q-item
          active
          clickable
          v-ripple
          exact
          to="/app/user/profile"
          active-class="menu-link"
        >
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>

          <q-item-section> Perfíl </q-item-section>
        </q-item>
        <q-item
          active
          clickable
          v-ripple
          exact
          to="/app/user/profilexxx"
          active-class="menu-link"
        >
          <q-item-section avatar>
            <q-icon name="help" />
          </q-item-section>

          <q-item-section> 404 </q-item-section>
        </q-item>
        <q-item
          active
          clickable
          v-ripple
          exact
          to="/forbidden"
          active-class="menu-link"
        >
          <q-item-section avatar>
            <q-icon name="shield" />
          </q-item-section>

          <q-item-section> Protegido </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

    <div class="absolute-top" style="height: 150px">
      <div
        class="flex flex-col items-center justify-center mb-4 bg-transparent  absolute-bottom"
      >
        <q-avatar size="56px" class="q-mb-sm shadow-4">
          <img :src="whiteAvatar" alt="Avatar" spinner-color="accent" />
        </q-avatar>
        <div class="text-base font-bold text-center text-white">
          {{ displayName }}
        </div>
      </div>
    </div>
    <div class="absolute-bottom shadow-up-2" style="height: 50px">
      <div class="flex flex-col items-center justify-center mt-2 absolute-top">
        <p class="text-xs text-center text-white">
          Powered by
          <a
            href="https://www.runcode.co"
            target="_blank"
            class="font-semibold text-pa-accent"
            >RunCode Ingeniería</a
          >
        </p>
        <p class="text-xs text-center text-white">
          &copy;{{ currentYear }} Todos los Derechos Reservados
        </p>
      </div>
    </div>
  </q-drawer>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    let store = useStore();
    const currentYear = computed(
      () => store.getters["storeCommons/currentYear"]
    );
    const drawerState = computed({
      get: () => store.getters["storeCommons/drawerState"],
      set: (val) => {
        store.dispatch("storeCommons/updateDrawerState", val);
      },
    });
    const whiteAvatar = computed(
      () => store.getters["storeCommons/whiteAvatar"]
    );
    const displayName = computed(
      () => store.getters["storeCommons/displayName"]
    );
    return {
      drawerState,
      currentYear,
      whiteAvatar,
      displayName,
    };
  },
};
</script>

<style lang="scss" scoped>
.image-profile-section {
  background: linear-gradient(45deg, $quaternary, $accent);
}

.menu-link {
  color: $accent;
  background: white;
}
</style>
