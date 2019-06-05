<template>
  <div>
    <div v-if="isLoadMore">
      <!-- <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
        <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
          <span style="font-size:15px;font-weight:620;">{{item.label}}</span>
        </tab-item>
      </tab>-->
      <div>
        <div class="crowd-car">
          <img :src="topItem.pic" class="img-top">
          <flexbox>
            <flexbox-item :span="8">
              <div class="flex-left">
                <span style="font-size:17px;font-weight:590;">{{topItem.cname}}</span>
              </div>
            </flexbox-item>
            <!-- <flexbox-item :span="4">
                  <div class="flex-right">
                      <p style="margin:0 auto; overflow:hidden; display:block; height:40px;line-height:40px;">
                        <img src="static/img/crowd/hot.png" style="width:18px; heigth:18px;" />
                        <span style="font-size: 15px; color:green;">众筹中</span>
                      </p>
                  </div>
            </flexbox-item>-->
          </flexbox>

          <flexbox style="height:40px;line-height:40px;">
            <flexbox-item :span="8">
              <div class="flex-left">
                <span style="color:coral; font-size:16px;">￥ {{topItem.price}}</span>
              </div>
            </flexbox-item>
            <flexbox-item :span="4">
              <div class="flex-right">
                <x-button
                  mini
                  :gradients="['#FF5E3A', '#FF9500']"
                  @click.native="crowdDetail(topItem, 0)"
                >立即支持</x-button>
              </div>
            </flexbox-item>
          </flexbox>

          <flexbox style="height:30px;line-height:30px; color:#888; font-size:14px;">
            <flexbox-item :span="8">
              <div class="flex-left">
                <p>
                  <span>{{topItem.support}}人支持</span>
                </p>
              </div>
            </flexbox-item>
            <flexbox-item :span="4">
              <div class="flex-right">
                <p>
                  <span>还剩{{topItem.remainder}}个</span>
                </p>
              </div>
            </flexbox-item>
          </flexbox>
        </div>

        <div v-for="(item, index) in crowdItems" :key="index" class="crowdItem">
          <flexbox @click.native="crowdDetail(item, index)">
            <flexbox-item :span="2.5" style="padding:0.3rem;">
              <div class="flex-demo-left">
                <img :src="item.item_pic" class="img-game-list">
              </div>
            </flexbox-item>
            <flexbox-item>
              <div style="padding-left:6px;">
                <p>
                  <span style="font-size:15px;">{{item.cname}}</span>
                </p>
                <p>
                  <box gap="10px">
                    <x-progress :percent="35" :show-cancel="false"></x-progress>
                  </box>
                </p>
                <p>
                  <flexbox>
                    <flexbox-item :span="8">
                      <p>
                        <span style="color: coral; font-size:14px;">￥ {{item.price}}</span>
                      </p>
                    </flexbox-item>
                    <flexbox-item :span="4">
                      <p>
                        <span style="color: #888; font-size:13px;">{{item.support}}人支持</span>
                      </p>
                    </flexbox-item>
                  </flexbox>
                </p>
              </div>
            </flexbox-item>
          </flexbox>
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

const tabList = () => [
  {
    label: "众筹大厅"
  },
  {
    label: "自由市场"
  }
];

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
      msg: "众筹",
      tabIndex: 0,
      tabItems: tabList(),
      topItem: null,
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
        func: "Stocks",
        control: "stock",
        oemInfo: this.GLOBAL.oemInfo
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
        console.log("mine", res.data);
        this.isLoadMore = true;
        if (res.data.errcode == "success") {
          this.topItem = res.data.data[0];
          let index = 0;
          res.data.data.forEach(element => {
            if (index > 0) {
              this.crowdItems.push(element);
            }
            index++;
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
  border-top-left-radius: 1.5em;
  border-top-right-radius: 1.5em;
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
