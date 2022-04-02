<template>
  <div class="home">
<!--    <div class="title">-->
<!--      <p>旗委巡察办</p>-->
<!--      <p>· 中共伊金霍洛旗委巡察工作领导小组办公室</p>-->
<!--    </div>-->
    <div class="box">
      <swiper
          :modules="modules"
          :autoplay="{paused:true}"
          :pagination="{ clickable: true }"
          :loop="true"
          v-show="bannerData.length !== 0"
      >
        <swiper-slide v-for="(item,index) in bannerData" :key="index">
          <img :src="imgUrl+item.bannerImg" alt="图片失效">
        </swiper-slide>
      </swiper>
      <div class="body">
        <div class="body_left">
          <div class="body_left_top">
            <div class="body_left_top_text">资料库</div>
            <div class="body_left_top_input">
              <p @click="blurClick()">请输入搜索关键词</p>
              <p @click="moreCLick()">更多＋</p>
            </div>
          </div>
          <div class="body_left_tab">
            <div class="body_left_tab_list" v-for="(item,index) in tabData1" :key="index">
              <div class="body_left_tab_list_list" v-for="(items,indexS) in item" :key="indexS" :style="items.databankId === null ? 'opacity: 0;':''" @click="items.databankId !== null ? applistpagedatainforeleaseApiFun(items.databankId,false):''">
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
                  <p>分类：{{item.datainfoTypename}}</p>
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
        <div class="body_right">
          <div class="body_right_top">
            <div class="body_right_title">常用公众号、网址链接</div>
            <div class="body_right_top_box">
              <div v-for="(item,index) in xxkList" :key="index" @click="ljClick(item.linkContent)">
                <img :src="item.img" alt="">
                <p>{{item.linkName}}</p>
              </div>
            </div>
            <div class="body_right_top_bot"><p @click="linkClick()">查看更多</p></div>
          </div>
          <div class="body_right_bot">
            <div class="body_right_title">云信访·云问卷·云测评</div>
            <div class="body_right_bot_box">
              <div><img src="../assets/yxf.png" alt=""><p>云信访</p></div>
              <div><img src="../assets/ywj.png" alt=""><p>云问卷</p></div>
              <div><img src="../assets/ycp.png" alt=""><p>云测评</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, onMounted ,getCurrentInstance} from "vue"
import {useRouter} from "vue-router"
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss/scrollbar';
import xxkImg from "../assets/xxk.png"
import ListImg from "../assets/ListImg.png"
import {listreleaseApi,applistpagedatainforeleaseApi,linkManageApi} from "@/utils/api";

export default {
  name: 'HomeView',
  components: {
    Swiper,
    SwiperSlide,
  },
  setup(){
    const {imgUrl} = getCurrentInstance().appContext.config.globalProperties
    const router = useRouter()
    const data = reactive({
      bannerData:[],
      tabId:"",
      tabData1:[],
      tabListData:[],
      xxkList:[],
      page:1,
      pages:null
    })

    onMounted(()=>{
      const utils = require('../utils/utils')

      listreleaseApi().then((response) => {
        data.tabId = response.data[0].databankId
        data.tabData1 = utils.lineFeed(response.data,8,"databankId")
        applistpagedatainforeleaseApiFun(response.data[0].databankId,false)
      }).catch(error => {
        console.log(error)
      })
      // const that = getCurrentInstance()
      // const { $loading } = that.appContext.config.globalProperties;
      // $loading.show("aaaaaaaaa")
      linkManageApi(1).then((response)=>{
        //console.log(response)
        for(let i in response.data){
          if(i < 6){
            response.data[i].img = xxkImg
            data.xxkList.push(response.data[i])
          }
        }
      })

      applistpagedatainforeleaseApi("",1,"",{}).then((response)=>{
        for(let i in response.data.rows){
          response.data.rows[i].bannerImg = response.data.rows[i].uploadPic.split(",")[0]
        }
        //console.log(response.data.rows)
        data.bannerData = response.data.rows
      }).catch(error=>{
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
        //console.log(response)
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

    function blurClick(){
      router.push("/search")
    }

    function linkClick(){
      router.push("/link")
    }

    function moreCLick(){
      router.push('more')
    }

    function ljClick(link){
      router.push({
        name:"iframe",
        params:{
          link:link
        }
      })
    }

    return {
      ...toRefs(data),
      modules: [Navigation, Pagination,Autoplay],
      applistpagedatainforeleaseApiFun,
      tabListClick,
      blurClick,
      linkClick,
      moreCLick,
      imgUrl,
      jzClick,
      ljClick
    };

  }
}
</script>

<style scoped lang="scss">

.home{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .box{
    height: 100%;
    width: 100%;
    padding: 50px 50px 16px;
    .swiper{
      width: 100%;
      height: 33%;
      .swiper-pagination-horizontal {
        .swiper-pagination-bullet-active{
          background: rgb(235,111,111) !important;
        }
      }
    }
    .swiper-slide {
      width: 100%;
      height: 100%;
      background-color: pink;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .body{
      width: 100%;
      padding-top: 50px;
      height: 67%;
      display: flex;
      justify-content: space-between;
      .body_left{
        width: 1400px;
        height: 100%;
        .body_left_top{
          width: 100%;
          height: 8%;
          display: flex;
          justify-content: space-between;
          border-bottom: 2px solid #E4E4E4;
          .body_left_top_text{
            font-size: 40px;
            font-weight: 900;
            color: #D02B2B;
            padding-bottom: 30px;
            border-bottom: 7px solid #D02B2B;
          }
          .body_left_top_input{
            display: flex;
            height: 100%;
            p:first-child{
              width: 430px;
              height: 82%;
              background: #FFFFFF;
              border-radius: 37px;
              border: 1px solid #D02B2B;
              outline: none;
              padding:0 30px;
              font-size: 24px;
              font-weight: 400;
              color: #878787;
              display: flex;
              align-items: center;
            }
            p:last-child{
              padding-left: 24px;
              height: 100%;
              font-size: 32px;
              font-weight: bold;
              color: #878787;
              display: flex;
              padding-top: 8px;
            }
          }
        }
        .body_left_tab{
          width: 100%;
          height: 18%;
          display: flex;
          flex-wrap: wrap;
          .body_left_tab_list{
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .body_left_tab_list_list{
              padding-top: 20px;
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
          height: 74%;
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
              width: 992px;
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
      .body_right{
        width: 1010px;
        height: 100%;
        .body_right_title{
          width: 100%;
          height: 92px;
          background: #D02B2B;
          font-size: 40px;
          font-weight: 900;
          color: #F8E1CC;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .body_right_top{
          width: 100%;
          border: 2px solid #D02B2B;
          margin-bottom: 30px;
          .body_right_top_box{
            width: 100%;
            padding: 30px 30px 19px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            div{
              width: 300px;
              height: 77px;
              background: #FFFFFF;
              border-radius: 39px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid #D02B2B;
              margin-bottom: 30px;

              img{
                width: 27px;
                height: 27px;
              }
              p{
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                font-size: 30px;
                font-weight: 400;
                color: #D02B2B;
              }
            }
          }
          .body_right_top_bot{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: center;
            font-size: 30px;
            font-weight: 400;
            color: #878787;
            line-height: 30px;
          }
        }
        .body_right_bot{
          width: 100%;
          border: 2px solid #D02B2B;
          .body_right_bot_box{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: 40px;
            div{
              display: flex;
              flex-wrap: wrap;
              width: 200px;
              img:first-child{
                width: 100%;
                height: 198px;
              }
              p:last-child{
                text-align: center;
                width: 100%;
                  font-size: 34px;
                  font-weight: 900;
                  color: #D02B2B;
                padding-top: 20px;
              }
            }
            //div:first-child{
            //  width: 200px;
            //  height: 198px;
            //  background: #ccc;
            //  img{
            //    width: 100%;
            //    height: 100%;
            //  }
            //}
            //div:last-child{
            //  width: 544px;
            //  height: 96px;
            //  font-size: 34px;
            //  font-weight: 900;
            //  color: #D02B2B;
            //}
          }
        }
      }
    }
  }
}
</style>
