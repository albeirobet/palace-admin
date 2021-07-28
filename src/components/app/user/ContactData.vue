<template>
  <div class="flex flex-col p-2 sm:flex-row sm:justify-between">
    <div class="flex flex-col ml-2">
      <span
        class="overflow-hidden text-base font-semibold  overflow-ellipsis text-pa-font"
        >Información de Contacto</span
      >
      <span class="text-sm text-pa-font">Gestionar Información</span>
    </div>
  </div>
  <q-separator />
  <q-list padding>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="phone" color="primary" size="md" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1">3208095046</q-item-label>
        <q-item-label caption>Teléfono</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar
          icon="label_important"
          color="primary"
          size="md"
          text-color="white"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase">Cundinamarca</q-item-label>
        <q-item-label caption>Departamento</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>

    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar
          icon="turned_in_not"
          color="primary"
          size="md"
          text-color="white"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase">Bogotá</q-item-label>
        <q-item-label caption>Ciudad</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar
          icon="directions"
          color="primary"
          size="md"
          text-color="white"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase">Toberín</q-item-label>
        <q-item-label caption>Barrio</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="map" color="primary" size="md" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase"
          >Calle 169 #16C-70</q-item-label
        >
        <q-item-label caption>Dirección</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="home" color="primary" size="md" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase">Arcadia 2</q-item-label>
        <q-item-label caption>Conjunto</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar
          icon="house_siding"
          color="primary"
          size="md"
          text-color="white"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase"
          >Interior 3 - Apto 303</q-item-label
        >
        <q-item-label caption>Indicación</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
