<template>
<div class="titleAssembly">
  <div v-show="TitleTrue" class="titleAssembly_home">
    <div>
      <p>中共伊金霍洛旗委员会巡察工作领导小组办公室</p>
    </div>
    <div @click="ljClick('https://www.yjhlcity.com/ysb/exam_cloud.html')">在线考试</div>
  </div>
  <img src="../assets/jt.png" alt="" @click="goClick()" v-show="!TitleTrue">
  <div class="titleAssembly_no_home" v-show="!TitleTrue">{{ TitleText }}</div>
</div>
</template>

<script>
import {useRouter} from "vue-router"

export default {
  name: "TitleAssembly",
  props:{
    TitleTrue:Boolean,
    TitleText:String
  },
  setup(){
    const router = useRouter()
    function goClick(){
      router.go(-1)
    }
    function ljClick(link){
      router.push({
        name:"iframeExam",
        params:{
          link:link
        }
      })
    }
    return{
      goClick,
      ljClick
    }
  }
}
</script>

<style scoped lang="scss">
.titleAssembly{
  width: 100%;
  height: 10%;
  background: #D02B2B;
  display: flex;
  align-items: center;
  padding:0 50px;
  img{
    width: 48px;
    height: 48px;
  }
 .titleAssembly_home{
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
   div:first-child{
     display: flex;
     align-items: center;
     p:first-child{
       font-size: 44px;
       font-weight: 900;
       color: #F8E1CC;
     }
   }
   div:last-child{
     font-size: 30px;
     color: #fff;
   }
 }
  .titleAssembly_no_home{
    font-size: 48px;
    font-weight: 400;
    color: #FCE0C9;
  }

}
</style>