<!-- 游戏列表
数据接口
1. cp/pull
[
  {
    `category_id`  '游戏类别',
    `category_title`  '类别名',
    `provider_id`  '供应商ID',
    `provider_name`  '供应商名',
    `ad_title`  '推广标题',
    `ranking`  '排名',
    `star_level`  '星级',
    `player_count`  '玩家人数',
    `down_count`  '下载次数',
    `comment_count`  '评论数',
    `game_version`  '版本号',
    `developer`  '开发者',
    `create_time`  '创建时间',
    `update_time`  '更新时间',
    `store_status`  '状态',
    `cpid`  'cpid',
    `cpurl`  'cpurl',
    `cp_addr`  'cp地址',
    `cp_name`  'cp_name',
    `game_title`  '标题',
    `game_link_url`  '游戏链接'
    `game_ico_uri`  '图标URI',
    `update_desc`  '更新描述',
    `game_resource_uri`  '资源URI, 展示大图',
    `game_screenshots`  '游戏截图',
    `game_desc`  '描述',
    `small_img_url`  '展示小图',
    `stock_price`  '当前资产价格',
    `stock_sum`  '当前资产数量',
    `grate`  '媒体分成',
    `hHeight`  '初次高度',
    `hBonus`  '历史分红',
    `hAds`  '历史分成',
  }
]
-->
<template>
  <div>
    <ScrollViewer :config="config">
      <template v-slot:default="props">
        <div>
          <div style="height:5px;"></div>
          <div style="background-color: white" v-if="props.tops.length>0">
            <div style="padding:10px 10px 0px 10px;" @click="gotoCpInfo(props.tops[0])"><img :src="props.tops[0].game_resource_uri" class="img-top"></div>
            <div>
              <p style="font-size:15px;padding: 5px 0px 0px 10px;">
                <span style="color:red;">推荐</span>
                <span style="margin-left:5px;">{{props.tops[0].game_title}}</span>
              </p>
            </div>
            <div><p style="font-size:13px; color: #888;padding: 5px 0px 10px 10px;">{{props.tops[0].provider_name}}</p></div>
          </div>
          <div v-for="(item, index) in props.content" :key="index" class="gameItem">
            <flexbox @click.native="gotoCpInfo(item, index)">
              <flexbox-item :span="4" style="padding:0.3rem;">
                <div class="flex-demo-left"><img :src="item.small_img_url" class="img-game-list"></div>
              </flexbox-item>
              <flexbox-item>
                <div style="padding-left:6px;">
                  <p><span style="font-size:15px;">{{item.game_title}}</span></p>
                  <p><span style="color: #888; font-size:14px;">{{item.game_desc}}</span></p>
                </div>
              </flexbox-item>
            </flexbox>
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
} from "vux";
import ScrollViewer from "@/components/ScrollViewer.vue";

export default {
  name: "Games",
  components: {
    Flexbox,
    FlexboxItem,
    ScrollViewer,
  },
  data() {
    return {
      config: {
        store: 'cp',                                 //引用的数据仓库
        nodata: '/static/img/default/no-product.png',   //列表为空时的占位图片
      },
    };
  },
  computed:{
    userBase() {return this.$store.state.user.auth},
  },
  methods: {
    gotoCpInfo(item, index) {
      this.$router.push({
        name: "GameInfo",
        params: { cpInfo: item },
      });
    },
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
.gameItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}
.img-game-list {
  width: 110px;
  height: 75px;
  border-radius: 12%;
  margin-left: 3px;
}
.img-top {
  width: 100%;
  height: 200px;
  border-radius: 4%;
}
.xs-plugin-pulldown-container {
  line-height: 40px;
  font-size: 18px;
  color: red;
}
.xs-plugin-pullup-container {
  line-height: 40px;
  font-size: 18px;
  color: red;
}
</style>