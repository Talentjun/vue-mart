import Notice from '@/components/Notice.vue';
import Vue from 'vue';

//给Notice添加一个创建组件实例的方法，可以动态编译自身模版并挂载
Notice.getInstance =props=>{
    //创建一个vue实例
    const instance = new Vue({
        render(h){//渲染函数，用于渲染指定模版，虚拟dom
            return h(Notice,{props})
        }
    }).$mount();//实例创建完成以后执行挂载 若不指定选择器，则模版将被渲染为文档之外的元素 $mount执行的是outerHTML

    //必须使用原生的dom api
    //$el指的是渲染Notice真实的dom
    document.body.appendChild(instance.$el);
    
    // 获取notice实例
    //$children指的是当前Vue实例中包含的所有组件实例
    const notice = instance.$children[0]
    return notice;
}

//设计单例模式，全局范围唯一创建一个Notice实例

let msgInstance = null;
function getInstance(){
    msgInstance =msgInstance || Notice.getInstance();
    return msgInstance;
}

export default {
    info({duration=2,content=""}){
        getInstance().add({//调用Notice的实例方法
            content,
            duration
        });
    }
}