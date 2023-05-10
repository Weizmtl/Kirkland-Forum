import axios from "axios";
import { ElLoading } from "element-plus";
import Message from '@/utils/Message'

const instance = axios.create({
    baseURL: "/api",
    timeout: 10 * 1000,
})

// Pre-request filter
let loading = null;
instance.interceptors.request.use((config)=>{
    if(config.showLoading){
        ElLoading.service({
            lock:true,
            text:"Loading",
            background:'rgba(0,0,0,0.7)'
        })
    }
}, (error)=>{
    if(config.showLoading && loading){
        loading.close();
    }
    Message.error("Request sent failed");
    return Promise.reject("Request sent failed")
});

//Post-request filters
instance.interceptors.response.use();

const request = (config)=>{


}

export default request;