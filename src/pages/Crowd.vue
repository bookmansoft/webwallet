<template>
  <div>
    <div v-if="isLoadMore">
      <div>
        <box gap="18px" style="margin-top:13px">
          <img src="http://114.116.148.48:9701/image/1/banner.png" style="width:100%">
        </box>
        <!-- todo: 替换为vue专用轮播组件 -->

        <div v-for="(item, index) in crowdItems" :key="index" class="crowdItem">
          <div class="crowd-car">
            <img :src="item.large_img_url" class="img-top">
            <flexbox>
              <flexbox-item :span="8">
                <div class="flex-left">
                  <span style="font-size:17px;font-weight:590;">{{item.cp_text}}</span>
                </div>
              </flexbox-item>
            </flexbox>

            <flexbox style="height:40px;line-height:40px;">
              <flexbox-item :span="8">
                <div class="flex-left">
                  <span style="color:coral; font-size:16px;">￥ {{item.stock_money}}</span>
                </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right">
                  <x-button
                    mini
                    :gradients="['#FF5E3A', '#FF9500']"
                    @click.native="crowdDetail(item, 0)"
                  >立即支持</x-button>
                </div>
              </flexbox-item>
            </flexbox>

            <flexbox style="height:30px;line-height:30px; color:#888; font-size:14px;">
              <flexbox-item :span="8">
                <div class="flex-left">
                  <p>
                    <span>{{item.support}}人支持</span>
                  </p>
                </div>
              </flexbox-item>
              <flexbox-item :span="4">
                <div class="flex-right">
                  <p>
                    <span>还剩{{item.remainder}}个</span>
                  </p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
    </div>

    <navs></navs>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import {
  XButton,
  Tab,
  TabItem,
  Flexbox,
  FlexboxItem,
  LoadMore,
  XProgress,
  Box
} from "vux";
import Navs from "@/components/Navs.vue";

export default {
  components: {
    Navs,
    Tab,
    XButton,
    TabItem,
    Flexbox,
    FlexboxItem,
    LoadMore,
    XProgress,
    Box
  },
  data() {
    return {
      crowdItems: [],
      isLoadMore: false
    };
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex);
    },
    crowdDetail(item, index) {
      this.$router.push({ name: "CrowdInfo", params: { item: item } });
    },
    crowFreedDetail(item, index) {
      this.$router.push({ name: "CrowdFreeInfo", params: { item: item } });
    },
    getStocks() {
      let data = {
        func: "ListRecord",
        control: "stockbase",
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log("返回结果", res.data);
        this.isLoadMore = true;
        if (res.data.total > 0) {
          res.data.list.forEach(element => {
            this.crowdItems.push(element);
          });
        }
      });
    }
  },
  created() {
    this.getStocks();
  }
};
</script>

<style scoped>
.crowdItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}

.crowdItem p {
  height: 30px;
  line-height: 30px;
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
  width: 45px;
  height: 45px;
  border-radius: 10%;
  margin-left: 4px;
}

.img-top {
  width: 100%;
  height: 180px;
  /*border-radius: 4%;*/
  /* border-top-left-radius: 1.5em;
  border-top-right-radius: 1.5em; */
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
</style>
