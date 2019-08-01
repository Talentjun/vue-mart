<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- 轮播图 -->
    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" alt="" class="slider">
        </router-link> 
        </cube-slide-item>
    </cube-slide>

    <!-- 商品列表 -->
    <goods-list :goods="filterGoods"></goods-list>


    <!-- 触发分类选择的按钮 -->
    <cube-button @click="showCatg">选择分类</cube-button>
    <!-- 商品分类的列表 data需要一个二维数组 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" @select="selectHandler"></cube-drawer>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodsList from '@/components/GoodsList.vue';
const labels={
  fe:'前端',
  python:"Python",
  java:'Java',
  bigdata:'大数据',
  ai:'人工智能'
}
export default {
  name: 'home',
  data() {
    return {
      slider: [],
      selectKeys:[],//分类过滤时使用
      keys:[],//分类,
      goods:[]//所有商品列表
    }
  },
  components: {
    GoodsList
  },
  async created () {
    const {data:{data:goods,slider,keys}}= await this.$http.get('/api/goods');//解构赋值
    console.log(goods,slider,keys);
    this.goods=goods;
    this.slider=slider;
    this.keys=keys;
    this.selectKeys=[...this.keys];//默认选中全部分类
  },
  methods: {
    showCatg() {//显示分类列表
      this.$refs.drawer.show();
    },
    selectHandler(val){
      console.log(val)
      this.selectKeys=[...val]
    }
  },
  computed: {
    filterGoods() {
      let ret=[];
      this.selectKeys.forEach(v=>{
        ret=ret.concat(this.goods[v]);
      })
      console.log(ret);
      return ret;
    },
    drawerList(){
      return this.keys.map(v=>{
        return {
          value:v,
          text:labels[v]//转换成中文标签
          
        }
      })
  }
  },
  
  
}
</script>
<style scoped>
    .cube-slide{
      height: auto;
    }
    .slider{
      width: 100%;
    }
</style>
