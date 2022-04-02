<template>
  <div class="database">
    <div class="htmlText">
      <div class="body_left_tab">
        <div class="body_left_tab_list" v-for="(item,index) in tabData1" :key="index">
          <div class="body_left_tab_list_list" v-for="(items,indexS) in item" :key="indexS" :style="items.databankId === null ? 'opacity: 0;':''" @click="items.databankId !== null ? applistpagedatainforeleaseApiFun(items.databankId):''">
            <div :style="tabId === items.databankId ? 'color:#E2001D':''">{{ items.databankId === null ? '啊啊啊啊' : items.bankName }} <p :style="items.num === undefined ? 'display:none':''">{{items.num}}</p></div>
            <div :style="tabId === items.databankId ? 'opacity: 1':'opacity: 0'"></div>
          </div>
        </div>
      </div>
      <div class="body_left_list">
        <div class="body_left_list_for" v-for="(item,index) in tabListData" :key="index" @click="tabListClick(item.datainfoId)">
          <div class="body_left_list_for_img"><img :src="item.uploadPic === ''?item.img:imgUrl+item.img" alt="图片失效"></div>
          <div class="body_left_list_for_text">
            <div class="body_left_list_for_text_top">
              <div>{{item.datainfoTitle}}</div>
              <div>{{item.datainfoSummary}}</div>
            </div>
            <div class="body_left_list_for_text_bot">
              <!--                  <p>来源：{{item.ly}}</p>-->
              <p>时间：{{item.gmtCreate}}</p>
            </div>
          </div>
        </div>
        <div class="jiaZai" v-if="pages !== 0">
          <p v-if="page === pages">到底了</p>
          <p v-else @click="jzClick()">点击加载更多</p>
        </div>
        <div v-else class="queShi">
          <img src="../assets/queshiye.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, onMounted , toRefs,getCurrentInstance} from "vue"
import {listreleaseApi,applistpagedatainforeleaseApi} from "@/utils/api";
import {useRouter} from "vue-router"
import ListImg from "../assets/ListImg.png"

export default {
  name: "MoreView",

  setup() {
    const router = useRouter()
    const utils = require('../utils/utils')
    const {imgUrl} = getCurrentInstance().appContext.config.globalProperties
    const data = reactive({
      tabId:null,
      tabData1:[],
      tabListData:[],
      page:1,
      pages:null
    })

    onMounted(()=>{
      listreleaseApi().then((response) => {
        data.tabId = response.data[0].databankId
        data.tabData1 = utils.lineFeed(response.data,8,"databankId")
        applistpagedatainforeleaseApiFun(response.data[0].databankId,false)
      }).catch(error => {
        console.log(error)
      })
    })

    function applistpagedatainforeleaseApiFun(id,isTrue){
      if(isTrue){
        data.page++
      }else {
        data.tabListData = []
        data.page = 1
      }
      applistpagedatainforeleaseApi(id,"","",{
        page:data.page,
        rows:20
      }).then((response)=>{
        data.pages = Math.ceil(response.data.total/20)
        data.tabId = id

        for(let i in response.data.rows){
          if(response.data.rows[i].uploadPic === ""){
            response.data.rows[i].img = ListImg
          }else {
            response.data.rows[i].img = response.data.rows[i].uploadPic.split(",")[0]
          }

          data.tabListData.push(response.data.rows[i])
        }
      }).catch(error=>{
        console.log(error)
      })
    }

    function jzClick(){
      applistpagedatainforeleaseApiFun(data.tabId,true)
    }

    function tabListClick(id){
      router.push({
        path:"/database",
        query:{
          id:id
        }
      })
    }

    return {
      ...toRefs(data),
      applistpagedatainforeleaseApiFun,
      imgUrl,
      jzClick,
      tabListClick
    }
  }
}
</script>

<style scoped lang="scss">
.database {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .htmlText {
    width: 100%;
    height: 100%;
    padding: 0 130px;
    .body_left_tab{
      width: 100%;
      height: 16%;
      display: flex;
      flex-wrap: wrap;
      .body_left_tab_list{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .body_left_tab_list_list{
          padding: 30px 0 10px;
          div:first-child{
            font-size: 30px;
            font-weight: 600;
            color: #000000;
            padding-bottom: 10px;
            position: relative;
            p{
              position: absolute;
              right: -34px;
              top: 5px;
              width: 32px;
              height: 32px;
              background: #D02B2B;
              font-size: 24px;
              font-weight: 400;
              color: #FFFFFF;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
          }
          div:last-child{
            width: 100%;
            height: 8px;
            background: linear-gradient(135deg, #EA5656 0%, #D02B2B 100%);
            border-radius: 39px;
          }
        }
      }
    }
    .body_left_list{
      width: 100%;
      height: 84%;
      overflow-y: auto;
      .jiaZai{
        width: 100%;
        text-align: center;
        padding: 10px 0;
        font-size: 30px;
      }
      .queShi{
        width: 100%;
        text-align: center;
        img{
          width: 300px;
          margin: 100px auto 0;
        }
      }
      .body_left_list_for{
        width: 100%;
        height: 290px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40px 0;
        border-bottom:1px dashed #E4E4E4;
        .body_left_list_for_img{
          width: 340px;
          height: 210px;
          background: #D8D8D8;
          border-radius: 10px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .body_left_list_for_text{
          width: 1856px;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          .body_left_list_for_text_top{
            width: 100%;
            div:first-child{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: 36px;
              font-weight: bold;
              color: #000000;
              padding-bottom: 12px;
            }
            div:last-child{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              font-size: 32px;
              font-weight: 400;
              color: #878787;
            }
          }
          .body_left_list_for_text_bot{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 32px;
            font-weight: 400;
            color: #878787;
          }
        }
      }
    }
  }

}
</style>