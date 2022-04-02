<template>
  <TitleAssembly :TitleTrue="TitleTrue" :TitleText="TitleText"></TitleAssembly>
  <div :class="TitleTrue ? 'appVueH':'appVue'">
    <router-view/>
  </div>
  <BottomAssembly v-if="!TitleTrue"></BottomAssembly>
</template>
<script>
import TitleAssembly from "./components/TitleAssembly"
import BottomAssembly from "./components/BottomAssembly"
import {useRouter} from "vue-router"
import {watch,reactive,ref} from "vue"
export default {
  name: "App",
  components:{
    TitleAssembly,
    BottomAssembly
  },
  setup(){
    const router = useRouter()
    let routers=reactive(router)
    const TitleTrue = ref(true)
    const TitleText = ref("")
    watch(routers,(newValue)=>{
      if(newValue.currentRoute.name === "home"){
        TitleTrue.value = true
      }else {
        TitleTrue.value = false
        TitleText.value = newValue.currentRoute.meta.title
      }
      //console.log(newValue.currentRoute.meta.title)
    })
    return{
      TitleTrue,
      TitleText
    }
  }
}
</script>
<style scoped lang="scss">
.appVue{
  width: 100%;
  height: 76%;
}
.appVueH{
  width: 100%;
  height: 90%;
}
</style>
