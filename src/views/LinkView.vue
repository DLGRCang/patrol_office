<template>
  <div class="link">
    <div class="htmlText">
      <div class="htmlText_top">
        <div v-for="(item,index) in tab" :key="index" @click="tabClick(item.id)">
          <p :style="tabId === item.id ? 'color: #E2001D;font-weight: 600;':'color: #000;'">{{item.text}}</p>
          <p :class="tabId === item.id ? 'tabPLast':''"></p>
        </div>
      </div>
      <div class="htmlText_bot">
        <div class="htmlText_bot_list" v-show="tabId === 0" v-for="(item,index) in leftLink1" :key="index">
          <div class="htmlText_bot_for" v-for="(items,indexS) in item" :key="indexS">
            <div :style="items.id === null ? '':'background: #ccc'"><img :src="imgUrl+items.linkContent" alt="图片失效" :style="items.id === null ? 'display:none;':''"></div>
            <p>{{items.linkName}}</p>
          </div>
        </div>
        <div class="htmlText_bot_list1" v-show="tabId === 1" v-for="(item,index) in rightLink1" :key="index">
            <div v-for="(items,indexS) in item" @click="items.id === null ? '':ljClick(items.linkContent)" :key="indexS" :style="items.id === null ? 'opacity: 0;':''">
<!--              <img :src="items.img" alt="">-->
              <p>{{items.linkName}}</p>
            </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {reactive,toRefs,onMounted,getCurrentInstance} from "vue"
import {linkManageApi} from "@/utils/api";
import {useRouter} from "vue-router"
export default {
  name: "LinkView",
  setup(){
    const router = useRouter()
    const {imgUrl} = getCurrentInstance().appContext.config.globalProperties
    const utils = require('../utils/utils')
    const data = reactive({
      tab:[
        {id:0,text:"常用公众号"},
        {id:1,text:"网址链接"},
      ],
      tabId:0,
      leftLink1:[],
      rightLink1:[]
    })

    onMounted(()=>{
      tabClick(0)
    })
    function tabClick(id){
      data.tabId = id
      linkManageApi(id).then((response)=>{
        //console.log(response)
        if (id === 0){
          data.leftLink1 = utils.lineFeed(response.data,7,'id')
        }else {
          data.rightLink1 = utils.lineFeed(response.data,4,'id')
        }
      })
    }

    function ljClick(link){
      //console.log(link)
      router.push({
        name:"iframe",
        params:{
          link:link
        }
      })
    }

    return{
      ...toRefs(data),
      tabClick,
      imgUrl,
      ljClick
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
    overflow: hidden;
    .htmlText_top{
      width: 100%;
      height: 14%;
      display: flex;
      align-items: center;
      justify-content: center;
      div{
        padding: 0 50px;
        text-align: center;
        p:first-child{
          font-size: 40px;
          font-weight: 400;
          padding-bottom: 38px;
        }
        p:last-child{
          width: 126px;
          height: 8px;
          border-radius: 39px;
          margin: 0 auto;
        }
        .tabPLast{
          background: linear-gradient(135deg, #EA5656 0%, #D02B2B 100%);
        }
      }
    }
    .htmlText_bot{
      width: 100%;
      height: 86%;
      overflow-y: auto;
      .htmlText_bot_list{
        width: 100%;
        padding: 0 120px 112px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .htmlText_bot_for{
          div:first-child{
            width: 200px;
            height: 200px;
            margin: 0 auto;
            img{
              width: 100%;
              height: 100%;
            }
          }
          p:last-child{
            padding-top: 30px;
            font-size: 30px;
            font-weight: 400;
            color: #000000;
            text-align: center;
          }
        }
      }
      .htmlText_bot_list1{
        width: 100%;
        padding: 0 96px 66px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div{
          width: 479px;
          height: 115px;
          background: #FFFFFF;
          border-radius: 5px;
          border: 3px solid #E2E2E2;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            width: 65px;
            height: 65px;
          }
          p{
            padding-left: 13px;
            font-size: 30px;
            font-weight: 400;
            color: #000000;
            text-align: center;
          }
        }
      }

    }
  }

}
</style>