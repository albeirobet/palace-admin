<template>
  <q-header elevated class="bg-white text-pa-font" height-hint="98">
    <q-toolbar>
      <q-btn flat round icon="menu" @click="toggleLeftDrawer" />
      <q-toolbar-title>
        <span
          class="flex flex-col mt-2 mb-2 text-lg font-semibold text-pa-accent"
          >{{ appTitle }}
          <span class="-mt-1 text-base text-pa-font">ARCADIA II</span>
        </span>
      </q-toolbar-title>

      <q-btn-dropdown color="accent" flat round dense icon="account_circle">
        <div class="row no-wrap q-pa-md">
          <q-list dense class="mt-2">
            <q-item clickable v-close-popup v-ripple to="/app/user/profile">
              <q-item-section>
                <q-item-label class="font-medium text-pa-font" lines="1"
                  >Perfil</q-item-label
                >
                <q-item-label caption>Gestionar Cuenta</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="manage_accounts" color="primary" />
              </q-item-section>
            </q-item>
            <q-separator class="my-1" />
            <q-item
              clickable
              v-close-popup
              v-ripple
              @click="userLogoutFunction"
            >
              <q-item-section>
                <q-item-label class="font-medium text-pa-font" lines="1"
                  >Cerrar Sesión</q-item-label
                >
                <q-item-label caption>Salir del Sistema</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="logout" color="accent" />
              </q-item-section>
            </q-item>
          </q-list>

          <q-separator vertical inset class="q-mx-lg" />

          <div class="flex flex-col items-center justify-center">
            <q-avatar size="56px" class="q-mb-sm shadow-4">
              <img :src="colorAvatar" alt="Avatar" spinner-color="white" />
            </q-avatar>
            <!-- <q-btn color="primary" label="Salir" push size="sm" v-close-popup /> -->
          </div>
        </div>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useUser from "../../../composables/auth/user";
export default {
  setup() {
    const router = useRouter();
    let store = useStore();
    const { userLogout } = useUser();

    const appTitle = computed(() => store.getters["storeCommons/appTitle"]);
    const colorAvatar = computed(
      () => store.getters["storeCommons/colorAvatar"]
    );

    const drawerState = computed({
      get: () => store.getters["storeCommons/drawerState"],
      set: (val) => {
        store.dispatch("storeCommons/updateDrawerState", val);
      },
    });
    const toggleLeftDrawer = () => {
      drawerState.value = !drawerState.value;
    };

    const userLogoutFunction = async () => {
      await userLogout();
      router.push({ name: "Login" });
    };

    return {
      toggleLeftDrawer,
      appTitle,
      userLogoutFunction,
      colorAvatar,
    };
  },
};
</script>
