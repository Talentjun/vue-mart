<template>
    <div>
        <cube-form :model="model" :schema="schema" @submit="handlerLogin" @validate="handlerValidate"></cube-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                model: {//数据模型
                    username:'',
                    password:'',
                },
                schema:{//表单结构模型
                    fields:[
                        {
                            type:'input',
                            modelKey:'username',
                            label:'用户名',
                            props:{
                                placeholder:'请输入用户名'
                            },
                            rules:{//校验规则
                                required:true
                            },
                            trigger:'blur',
                            messages:{
                                required:'用户名为必填项'
                            }

                        },
                        {
                            type:'input',
                            modelKey:'password',
                            label:'密码',
                            props:{
                                placeholder:'请输入密码',
                                type:'password',
                                eye:{open:false}
                            },
                            rules:{//校验规则
                                required:true
                            },
                            trigger:'blur',
                            messages:{
                                required:'密码为必填项'
                            }

                        },
                        {//登录按钮
                            type:'submit',
                            label:'登录'
                        }
                    ]
                }
            }
        },
        methods: {
            async handlerLogin(e) {
                e.preventDefault();
                console.log('登录');
                /* const res=await this.$http.get('/api/login',{params:{
                    username:this.model.username,
                    password:this.model.password
                }}) */
                const res= await this.$http.post('/api/login',{
                    username:this.model.username,
                    password:this.model.password
                })

                console.log(res);

                const {code,token,message} =res.data;
                if(code == 0){
                    localStorage.setItem('token',token);
                    this.$store.commit('setToken',token);
                    //回跳
                    /* if(JSON.stringify(this.$route.query) !== "{}"){
                        const {redirect} = this.$route.query;
                        this.$router.push(redirect);
                    }else{
                        this.$router.push('/');
                    } */
                    const {redirect} = this.$route.query || '/';
                    this.$router.push(redirect);
                    
                }else{
                    //登录失败
                    const toast = this.$createToast({
                        time: 2000,
                        txt: message || '登录失败',
                        type: 'error'
                    });
                    toast.show();
                }
            },
            handlerValidate(ret){
                console.log('校验：'+ ret)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>