<template>
<div class="loading" v-show="false"></div>
</template>

<script>
export default {
  name: "loadingAssembly",
  props: {
    msg: Object
  }
}
</script>

<style scoped lang="scss">
.loading{
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  background: red;
}
</style>