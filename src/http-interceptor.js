//拦截axios所有http请求，预先放入token请求头
import axios from 'axios';
import store from '@/store';
import router from './router';

axios.interceptors.request.use(
    config=>{
        if(store.state.token){
            //放入请求头
            config.headers.token=store.state.token;
        }
        return config;
    }
)

//响应拦截器，提前预处理响应

axios.interceptors.response.use(
    response=>{
        //如果code是-1，说明用户已注销或者token已过期
        //此时需要重新登录，并且还要清楚本地缓存信息
        if(response.status == 200){
            const data=response.data;
            if(data.code == -1){
                clearHandler();
            }
        }
        return response;
    },err=>{
        if(err.response.status === 401){//未授权
            clearHandler();
        }
    }
)

function clearHandler(){
    //清空缓存
    store.commit('setToken','');
    localStorage.removeItem('token');
    
    //跳转登录页面  当前路由的路由信息对象，包含了当前匹配路由的信息
    router.push({path:'/login',query:{redirect:router.currentRoute.path}})
}