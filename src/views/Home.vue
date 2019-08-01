<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <!-- 轮播图 -->

    <!-- 页头 -->
    <k-header title="贼棒商城"></k-header>

    <cube-slide :data="slider" :interval="5000">
      <cube-slide-item v-for="item in slider" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <img :src="item.img" alt class="slider" />
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <!-- 触发分类选择的按钮 -->
    <cube-button @click="showCatg">选择分类</cube-button>

    <!-- 商品列表 -->
    <goods-list :goods="filterGoods" @addCart="onAddCart"></goods-list>

    <!-- 商品分类的列表 data需要一个二维数组 -->
    <cube-drawer ref="drawer" title="请选择分类" :data="[drawerList]" @select="selectHandler"></cube-drawer>

    <!-- 加购动画的载体 -->
    <div class="ball-wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="ball" v-show="ball.show"></div>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GoodsList from "@/components/GoodsList.vue";
const labels = {
  fe: "前端",
  python: "Python",
  java: "Java",
  bigdata: "大数据",
  ai: "人工智能"
};
export default {
  name: "home",
  data() {
    return {
      ball: {
        show: true, //显示控制
        el: null //目标dom 的引用
      },
      slider: [],
      selectKeys: [], //分类过滤时使用
      keys: [], //分类,
      goods: [] //所有商品列表
    };
  },
  components: {
    GoodsList
  },
  async created() {
    const {
      data: { data: goods, slider, keys }
    } = await this.$http.get("/api/goods"); //解构赋值
    console.log(goods, slider, keys);
    this.goods = goods;
    this.slider = slider;
    this.keys = keys;
    this.selectKeys = [...this.keys]; //默认选中全部分类
  },
  methods: {
    showCatg() {
      //显示分类列表
      this.$refs.drawer.show();

      //创建Notice实例 挂载到了body上
      //这是cube-ui的方式
      /* const notice = this.$createNotice();
      notice.add({content:'lalala',duration:2}) */

      //自定义方式
      this.$notice.info({
        duration:3,
        content:'一些消息内容'
      })
    },
    selectHandler(val) {
      console.log(val);
      this.selectKeys = [...val];
    },
    onAddCart(el){
      this.ball.el=el;
      this.ball.show=true;
    },
    beforeEnter(){
      //动画的初始值设置
      //获取点击的dom的坐标
      const dom =this.ball.el;
      const rect=dom.getBoundingClientRect();
      console.log(rect.top,rect.left);
      //计算点击坐标
      const x=rect.left-window.innerWitdh/2;
      const y=-(window.innerHeight-rect.top-30);
      el.style.display = 'block';
      el.style.transform= `translate3d(${x}px,${y}px,0)`;

    },
    enter(el,done){
      //el当前动画元素 动画必须要有重绘的触发
      //获取offsetHeight触发重绘
      document.body.offsetHeight;
      //设置动画的结束点
      el.style.transform = `translate3d(0,0,0)`;
      el.addEventListener('transitionend',done);
    },
    afterEnter(el){
      this.ball.show = true;
      this.ball.display='none';
    },
  },
  computed: {
    filterGoods() {
      let ret = [];
      this.selectKeys.forEach(v => {
        ret = ret.concat(this.goods[v]);
      });
      console.log(ret);
      return ret;
    },
    drawerList() {
      return this.keys.map(v => {
        return {
          value: v,
          text: labels[v] //转换成中文标签
        };
      });
    }
  }
};
</script>
<style scoped lang="stylus">
.cube-slide {
  height: auto;
}

.slider {
  width: 100%;
}

.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);

    .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>
