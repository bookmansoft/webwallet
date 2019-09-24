<!-- 我的凭证
数据接口
1. stockMine/pull
[
  {
    src,          //图片
    cid,          //CP编号
    addr,         //凭证存储地址
    sum,          //凭证存储总量
    price,        //凭证持有成本，单位 尘
    cp_desc,      //游戏描述
  },
]
-->
<template>
  <div class="root" style="background-color:white;margin-top:-8px">
    <ScrollViewer :config="config">
      <template v-slot:default="props">
        <div style="margin-top:10px">
          <div v-for="(item, index) in props.content" :key="index" class="crowdItem">
            <group>
                <flexbox class="crowdItem"  @click.native="showDetail(item, index)">
                    <flexbox-item :span="2.5" style="padding:0.3rem;">
                        <div class="flex-demo-left">
                          <img :src="item.src" class="img-game-list" />
                        </div>
                    </flexbox-item>
                    <flexbox-item>
                        <div style="padding-left:6px;">
                          <p><span style="font-size:15px;">{{item.title}}</span></p>
                          <p><span style="color: coral; font-size:14px;">持有 {{item.sum}} 个, 平均成本 {{parseFloat(item.price/unit.kg).toFixed(3)}} 千克</span></p>
                        </div>
                        <div style="padding-left:6px;" v-if="item.sell_sum>0">
                          <p><span style="color: #888; font-size:13px;">挂单量 {{item.sell_sum}} 挂单价 {{parseFloat(item.sell_price/unit.kg).toFixed(3)}} 千克</span></p>
                          <p><span style="color: #888; font-size:13px;">截止时间 {{item.validtime}}</span></p>
                        </div>
                    </flexbox-item>
                </flexbox>
            </group>
          </div>
        </div>
      </template>
    </ScrollViewer>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
  Group,
} from "vux";
import ScrollViewer from "@/components/ScrollViewer.vue";

export default {
  name: 'MyStock',
  components: {
    Flexbox,
    FlexboxItem,
    Group,
    ScrollViewer,
  },
  props: [
    'showType',
  ],
  data: function() {
    return {
      config: {
        store: 'stockMine',
        nodata: '/static/img/default/no-product.png',   //列表为空时的占位图片
      },
    };
  },
  computed: {
    unit() {return this.$store.state.config.dict['base'];},
  },
  methods: {
    /**
     * 跳转至详情页
     */
    showDetail(item) {
      console.log('showDetail', item);
      this.$router.push({ name: 'MyStockInfo', params: { item: item }});
    },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
}
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem p {
  height: 45px;
  line-height: 45px;
}

.crowdItem2 {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem2 p {
  height: 40px;
  line-height: 40px;
}

.crowd-car {
  padding: 10px; 
  /*background-color: white; */ 
  /*border-radius: 4%;*/
}

.img-game-list {
    width: 75px;
    height: 75px;
    border-radius: 12%;
    margin-left: 3px;
}

.img-game-list2 {
    width: 65px;
    height: 65px;
    border-radius: 10%;
    margin-left: 4px;
}

.img-top {
  width:100%;
  height:180px;
  /*border-radius: 4%;*/
  border-top-left-radius:1.5em; 
  border-top-right-radius:1.5em; 
}
.imgDemo {
  width: 100%;
  height: auto;
}
.flex-left {
  text-align: left;
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
.flex-center {
  font-size: 15px;
  text-align: center;
  padding: 5px;
}
.flex-center p {
  height: 30px;
  line-height: 30px;
}
</style>

