<template>
  <div class="flex flex-col p-2 sm:flex-row sm:justify-between">
    <div class="flex flex-col ml-2">
      <span
        class="overflow-hidden text-base font-semibold  overflow-ellipsis text-pa-font"
        >Información Personal</span
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
        <q-item-label lines="1" class="uppercase">Eyder</q-item-label>
        <q-item-label caption>Primer Nombre</q-item-label>
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
        <q-item-label lines="1" class="uppercase">Albeiro</q-item-label>
        <q-item-label caption>Segundo Nombre</q-item-label>
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
        <q-item-label lines="1" class="uppercase">Ascuntar</q-item-label>
        <q-item-label caption>Primer Apellido</q-item-label>
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
        <q-item-label lines="1" class="uppercase">Rosales</q-item-label>
        <q-item-label caption>Segundo Apellido</q-item-label>
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
        <q-item-label lines="1" class="uppercase">Cedula</q-item-label>
        <q-item-label caption>Tipo Documento Identificación</q-item-label>
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
        <q-item-label lines="1" class="uppercase">1120216079</q-item-label>
        <q-item-label caption>Número de Documento</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar
          icon="house_siding"
          color="quinary"
          size="md"
          text-color="white"
        />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase">23 Mar 1986</q-item-label>
        <q-item-label caption>Fecha Nacimiento</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
    <q-item clickable v-ripple>
      <q-item-section avatar top>
        <q-avatar icon="work" color="accent" size="md" text-color="white" />
      </q-item-section>

      <q-item-section>
        <q-item-label lines="1" class="uppercase"
          >Ingeniero en Sistemas</q-item-label
        >
        <q-item-label caption>Profesión</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="edit" color="accent" />
      </q-item-section>
    </q-item>
  </q-list>
</template>
