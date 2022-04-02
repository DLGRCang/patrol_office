<template>
  <div class="link">
    <div class="htmlText">
      <iframe :src="url" frameborder="0" style="width: 100%;height: 100%;"></iframe>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router"
export default {
  name: "IframeView",

  setup(){
    return{
      url:useRoute().params.link === undefined ? 'https://www.yjhlcity.com/xcbmanagement/route/file/download/true/'+useRoute().params.path:useRoute().params.link
    }
  }
}
</script>

<style scoped lang="scss">
.link{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .htmlText{
    width: 100%;
    height: 100%;
  }

}
</style>