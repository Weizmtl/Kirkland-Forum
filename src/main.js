import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VueCookies from 'vue-cookies'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import './assets/base.scss'
import '@/assets/icon/iconfont.css'
import  store from './store'

//global methods
import Verify from '@/utils/Verify'
import Message from '@/utils/Message'
import Request from '@/utils/Request'
// global components
import Dialog from "@/components/Dialog.vue"
import Avatar from "@/components/Avatar.vue"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ElementPlus);
app.config.globalProperties.VueCookies = VueCookies;
app.config.globalProperties.globalInfo = {
    bodyWidth: 1300,
    avatarUrl:"/api/file/getAvatar/"
}
app.config.globalProperties.Verify = Verify;
app.config.globalProperties.Message = Message;
app.config.globalProperties.Request = Request;

app.component("Dialog", Dialog);
app.component("Avatar", Avatar);

app.mount('#app')
