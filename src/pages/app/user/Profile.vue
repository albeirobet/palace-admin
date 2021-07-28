<template>
  <div class="container p-2 mx-auto mt-1 rounded-md sm:mt-0">
    <div class="grid grid-cols-1 gap-2 md:grid-cols-3">
      <div class="bg-white rounded-md shadow-6">
        <div class="flex p-2 mt-2 mb-2">
          <img
            :src="colorAvatar"
            alt="Avatar"
            class="w-16 ml-2 rounded-full shadow-4"
          />
          <div class="flex flex-col justify-center ml-2 text-left">
            <span
              class="text-base font-semibold truncate  w-44 md:overflow-ellipsis text-pa-font"
              >{{ displayName }}
            </span>
            <span
              class="w-32 text-sm truncate md:overflow-ellipsis text-pa-font"
              >Software Developer</span
            >
          </div>
        </div>
        <q-separator />
        <div class="mt-2">
          <q-list padding class="mb-2 rounded-borders">
            <q-item-label
              class="text-sm font-semibold text-center uppercase text-pa-font"
              header
              >Datos Generales Carlitos</q-item-label
            >
            <q-item
              clickable
              v-ripple
              to="/app/user/profile/contact-data"
              exact
              active-class="menu-link"
            >
              <q-item-section avatar top>
                <q-avatar
                  icon="badge"
                  size="lg"
                  color="accent"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Información de Contacto</q-item-label>
                <q-item-label class="text-xs"
                  >Gestionar información</q-item-label
                >
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-ripple
              to="/app/user/profile/personal-data"
              exact
              active-class="menu-link"
            >
              <q-item-section avatar top>
                <q-avatar
                  icon="person"
                  size="lg"
                  color="accent"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Información Personal</q-item-label>
                <q-item-label class="text-xs"
                  >Gestionar información</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              to="/app/user/profile/account-settings"
              exact
              active-class="menu-link"
            >
              <q-item-section avatar top>
                <q-avatar
                  icon="manage_accounts"
                  color="quinary"
                  text-color="white"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label lines="1">Información de Cuenta</q-item-label>
                <q-item-label class="text-xs"
                  >Gestionar información</q-item-label
                >
              </q-item-section>

              <q-item-section side>
                <q-icon color="accent" name="info" />
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
      <div class="bg-white rounded-md md:col-span-2 shadow-6">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const colorAvatar = computed(
      () => store.getters["storeCommons/colorAvatar"]
    );
    const displayName = computed(
      () => store.getters["storeCommons/displayName"]
    );
    const emailUser = computed(() => store.getters["storeCommons/emailUser"]);

    return {
      colorAvatar,
      displayName,
      emailUser,
    };
  },
};
</script>

<style lang="scss" scoped>
.menu-link {
  color: white;
  background: $primary;
}
</style>
