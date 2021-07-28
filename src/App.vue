<template>
  <router-view class="default-font" />
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style lang="scss">
.default-font {
  font-family: "Nunito", sans-serif;
  color: #525970;
}
// body {
//   font: 20px Arial, sans-serif;
// }
</style>
