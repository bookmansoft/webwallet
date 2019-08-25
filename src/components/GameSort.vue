<!-- 游戏分类页面
1. 数据接口 gameCategory: 获取服务端类别配置表
-->
<template>
  <div>
    <div v-if="ready && showCategory">
      <grid :show-lr-borders="false" :show-vertical-dividers="true" :cols="3" style="top:5px;">
        <grid-item v-for="(item, index) in gameCategory" :key="index" :label="item.label" @on-item-click="onItemClick(item)">
          <img slot="icon" :src="item.icon">
        </grid-item>
      </grid>
    </div>
    <x-button v-if="ready && !showCategory" plain style="border-radius:5px;color:rgb(255,113,101)" type="warn" @click.native="viewCategory()">返回目录</x-button>
    <scrolllist ref="sl001" :config="config(category)">
      <template v-slot:default="props">
          <div v-for="(item, index) in props.content" :key="index" class="gameItem">
            <flexbox @click.native="gotoCpInfo(item, index)">
              <flexbox-item :span="4" style="padding:0.3rem;">
                <div class="flex-demo-left">
                  <img :src="item.small_img_url" class="img-game-list">
                </div>
              </flexbox-item>
              <flexbox-item>
                <div style="padding-left:6px;">
                  <p>
                    <span style="font-size:15px;">{{item.game_title}}</span>
                  </p>
                  <br>
                  <p>
                    <span style="color: #888; font-size:14px;">{{item.game_desc}}</span>
                  </p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
      </template>
    </scrolllist>
  </div>
</template>

<script>
import {
  Grid, 
  GridItem,
  XButton,
  Flexbox,
  FlexboxItem,
} from "vux";
import scrolllist from "@/components/ScrollList.vue";

export default {
  name: 'GameSort',
  components: {
    Grid, 
    GridItem,
    XButton,
    Flexbox,
    FlexboxItem,
    scrolllist,
  },
  data () {
    return {
      ready: false,
      showCategory: true,
      category: 1,
    }
  },
  computed: {
    gameCategory() { 
      return this.$store.state.config.dict['gameCategory'];
    },
    userBase() {
      return this.$store.state.user.auth;
    },
    config() {
      //计算属性不能是函数形式，因此在内部返回带参函数
      return (cls) => {
        return {
          store: 'cp',              //引用的数据仓库
          nodata: '',               //列表为空时的占位图片
          selection: {
            category: cls,
          }
        };
      }
    }
  },
  methods: {
    viewCategory() {
      this.showCategory = true;
    },
    onItemClick(item) {
        this.showCategory = false;  //隐藏分类列表，显示游戏列表
        this.category = item.index; //设定当前游戏分类
        this.$refs.sl001.getContent(true);
    },
    gotoCpInfo(item, index) {
      this.$router.push({
        name: "GameInfo",
        params: { cpInfo: item },
      });
    },    
  },
  mounted() {
    console.log('gamesort mounted', this.$refs);
  },
  created() {
    if(!!this.userBase.uid) {
      this.$store.dispatch('config/pull', {file: 'gameCategory'}).then(()=>{
        this.ready = true;
      });
    }
  },
}
</script>
<style scoped>
.grid-center {
  display: block;
  text-align: center;
  color: #666;
}
.weui-grids {
  background-color: #fff;
}
</style>