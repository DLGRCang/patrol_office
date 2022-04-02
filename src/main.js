import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'
//import loading from "@/utils/loading";

const app = createApp(App)
app.config.globalProperties.imgUrl = "https://www.yjhlcity.com/xcbmanagement/route/file/download/true/"
app.use(router).mount('#app')
//.use(loading)
