<template>
  <div class="database">
    <div class="htmlText">
      <div class="htmlText_input" :class="search === '' ? 'htmlText_input_padding':'htmlText_input_paddingR'">
        <img src="../assets/search.png" alt="">
        <input type="text" v-model="search" placeholder="请输入搜索关键词">
        <img src="../assets/cha.png" alt="" :style="search === '' ? 'display:none':'display: block'" @click="chaClick()">
        <div :style="search === '' ? 'display:none':'display: block'" @click="searchClick()"><p>搜索</p></div>
      </div>
      <img src="../assets/queshiye.png" alt="" class="queshiye" v-show="list.length === 0 ? true:false">
      <div class="htmlText_list">
        <div class="body_left_list_for" v-for="(item,index) in list" :key="index" @click="tabListClick(item.datainfoId)">
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
      </div>
    </div>
  </div>
</template>

<script>
import {reactive,toRefs,getCurrentInstance} from 'vue'
import {applistpagedatainforeleaseApi} from "@/utils/api";
import {useRouter} from "vue-router"
import ListImg from "../assets/ListImg.png"
export default {
  name: "SearchView",
  setup(){
    const router = useRouter()
    const {imgUrl} = getCurrentInstance().appContext.config.globalProperties
    const data = reactive({
      search:'',
      list:[]
    })

    function searchClick(){
      data.list = []
      applistpagedatainforeleaseApi("","",data.search,{}).then((response)=>{
        //console.log(response)
        for(let i in response.data.rows){
          if(response.data.rows[i].uploadPic === ""){
            response.data.rows[i].img = ListImg
          }else {
            response.data.rows[i].img = response.data.rows[i].uploadPic.split(",")[0]
          }

          data.list.push(response.data.rows[i])
        }
      }).catch(error=>{
        console.log(error)
      })
    }

    function chaClick(){
      data.search = ""
    }

    function tabListClick(id){
      router.push({
        path:"/database",
        query:{
          id:id
        }
      })
    }

    return{
      ...toRefs(data),
      chaClick,
      searchClick,
      imgUrl,
      tabListClick
    }
  }
}
</script>

<style scoped lang="scss">
.database{
  width: 100%;
  height: 100%;
  overflow: hidden;
  .htmlText{
    width: 100%;
    height: 100%;
    padding: 0 50px;
    text-align: center;
    .htmlText_input_padding{
      padding-right: 325px;
    }
    .htmlText_input{
      width: 1400px;
      height: 8%;
      background: #FFFFFF;
      border-radius: 57px;
      border: 3px solid #D02B2B;
      margin: 4% auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 93px;
      img{
        width: 50px;
        height: 50px;
      }
      input{
        width: 900px;
        font-size: 50px;
        border: none;
        outline: none;
        color: #D02B2B;

      }
      input::-webkit-input-placeholder{
        color:#D02B2B;
      }

      div{
        width: 200px;
        height: 100%;
        border-radius: 0 57px 57px 0;
        background: #D02B2B;
        color: #fff;
        font-size: 45px;
        p{
          border-radius: 0 57px 57px 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
        }
      }
    }
    .queshiye{
      width: 300px;
      height: 390px;
      margin: 244px auto 0;
    }
    .htmlText_list{
      width: 100%;
      height: 88%;
      overflow-y: auto;
      padding-top: 3%;
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
          width: 2016px;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          align-content: space-between;
          text-align: left;
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