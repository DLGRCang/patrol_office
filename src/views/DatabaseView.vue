<template>
<div class="database">
  <div class="htmlText">
    <div class="htmlText_title">{{htmlList.datainfoTitle}}</div>
<!--    <div class="htmlText_time">-->
<!--      来源：{{htmlList.ly}}   发布时间：{{htmlList.time}}-->
<!--    </div>-->

    <div v-html="htmlList.datainfoContent"></div>
    <div class="htmlTextImg" v-if="htmlList.uploadPic !== ''">
      <h2>资料库图片</h2>
      <img :src="imgUrl+item" alt="" v-for="(item,index) in htmlList.uploadPicList" :key="index">
    </div>
    <div class="htmlTextImg" v-if="htmlList.uploadVideo !== ''">
      <h2>资料库视频</h2>
      <div class="htmlTextImg_video" v-for="(item,index) in htmlList.uploadVideoList"
           :key="index">
        <videoPlay
            v-bind="item" />
      </div>
    </div>
    <div class="htmlTextImg" v-if="htmlList.uploadAudio !== ''">
      <h2>资料库音频</h2>
      <audio v-for="(item,index) in htmlList.uploadAudioList" :key="index" :src="imgUrl+item" controls="controls" style="width: 100%;margin-bottom: 20px"></audio>
    </div>

    <div class="htmlTextImg" v-if="htmlList.uploadFile !== ''">
      <h2>资料库附件</h2>
      <div class="htmlTextImg_file">
        <a v-for="(item,index) in htmlList.uploadFileList" :key="index" :href="imgUrl+item.path" :download="htmlList.datainfoTitle+(index+1)">{{item.filename}}（点击下载）</a>
<!--        <embed v-for="(item,index) in htmlList.uploadFileList" :key="index" v-show="item.file === 'pdf'" :src="imgUrl+item.path" frameborder="0" style="width: 100%;height: 1080px;"/>-->
<!--        <object v-for="(item,index) in htmlList.uploadFileList" :key="index" v-show="item.file === 'pdf'" :data="imgUrl+item.path" type="application/pdf" style="width: 100%;height: 1000px"></object>-->
      </div>
    </div>
  </div>

</div>
</template>

<script>

import {ref, onMounted, getCurrentInstance} from "vue"
import {useRoute} from "vue-router"
import {getreleaseApi} from "@/utils/api";
import 'vue3-video-play/dist/style.css'
import {videoPlay} from "vue3-video-play"

export default {
  name: "DatabaseView",
  components: {
    videoPlay
  },
  setup(){
    const {imgUrl} = getCurrentInstance().appContext.config.globalProperties
    //const utils = require('../utils/utils')
    const route = useRoute()
    //const router = useRouter()
    const htmlList = ref({})

    onMounted(()=>{

      //htmlList.htmlText = utils.htmlUnEscape(htmlList.htmlText)
      getreleaseApi(route.query.id).then((response)=>{
        response.data.uploadAudioList = response.data.uploadAudio.split(',')
        let fileFor = response.data.upload_filename.split(',')
        for(let i in fileFor){
          fileFor[i] = {
            filename:fileFor[i],
            path:response.data.uploadFile.split(',')[i],
            file:fileFor[i].slice((fileFor[i].length-3),(fileFor[i].length))
          }
        }
        response.data.uploadFileList = fileFor
        response.data.uploadPicList = response.data.uploadPic.split(',')
        let videoFor = response.data.uploadVideo.split(',')
        for(let i in videoFor){
          videoFor[i] = {
            width:"100%",
            muted: false, //静音
            webFullScreen: false,
            speedRate: ["0.75", "1.0", "1.25", "1.5", "2.0"], //播放倍速
            autoPlay: false, //自动播放
            loop: false, //循环播放
            mirror: false, //镜像画面
            ligthOff: false,  //关灯模式
            volume: 1, //默认音量大小
            control: true, //是否显示控制器
            title: '', //视频名称
            src: imgUrl+videoFor[i], //视频源
            poster: '', //封面
          }
        }
        response.data.uploadVideoList = videoFor
        response.data.datainfoContent = response.data.datainfoContent.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi, (match,p) => {
          // let imgs = match.replace(/src=['"]?([^'"]*)['"]?/i, (match1,p1) => {
          //   return `src="${'https://www.yjhlcity.com/xcbmanagement/'+p1}"`
          // })
          return `<img src="${'https://www.yjhlcity.com/xcbmanagement/'+p}" style="width: 100%"/>`
        })
       // console.log(response.data)
        htmlList.value = response.data

      })
    })
    // function fujianClick(data,filename) {
    //   const a = document.createElement('a')
    //   //   let url = baseUrl + binding.value // 若是不完整的url则需要拼接baseURL
    //   const url = data // 完整的url则直接使用
    //   // 这里是将url转成blob地址，
    //   fetch(url).then(res => res.blob()).then(blob => { // 将链接地址字符内容转变成blob地址
    //     a.href = URL.createObjectURL(blob)
    //     //console.log(a.href)
    //     a.download = filename // 下载文件的名字
    //     // a.download = url.split('/')[url.split('/').length -1] //  // 下载文件的名字
    //     document.body.appendChild(a)
    //     a.click()
    //   })
    // }


    return{
      htmlList,
      imgUrl
    }
  }
}
</script>

<style scoped lang="scss">
.database{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  .pdf_class{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 2;
    background: rgba(0,0,0,0.6);
    padding: 100px;
  }
  .htmlText{
    width: 100%;
    height: 100%;
    padding: 60px 130px;
    overflow-y: auto;
    .htmlText_title{
      font-size: 80px;
      font-weight: 900;
      color: #D02B2B;
      text-align: center;
      padding-bottom: 20px;
    }
    .htmlText_time{
      padding-bottom: 84px;
      font-size: 36px;
      font-weight: 400;
      color: #878787;
      text-align: center;
    }
    .htmlTextImg{
      width: 100%;
      padding: 20px 0;
      h2{
        padding-bottom: 30px;
      }
      img{
        width: 100%;
        margin-bottom: 20px;
      }
      .htmlTextImg_video{
        width: 100%;
        padding: 20px 0;
      }
      .htmlTextImg_file{
        display: flex;
        flex-wrap: wrap;
        a{
          border: 1px solid #000;
          padding: 30px;
          font-size: 30px;
          font-weight: bold;
          margin: 30px;
          color: #000;
        }
      }
    }

  }

}
</style>