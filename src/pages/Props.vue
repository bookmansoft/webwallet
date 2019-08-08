<!-- 我的道具列表
数据接口：
1. prop.PropList -> propList 
[
  {
    "pid",
    "cid",
    "cpurl",
    "cp_name",
    "oid",
    "pst":
        // propStatus {
        //     Sale: 2,        //拍卖中    - 发起了拍卖交易，等待竞价结束
        //     Borrow: 3,      //已借出    - 道具已经借出
        //     Delete: 4,      //已删除    - 道具已经彻底失效、不可恢复
        //     Ready: 9,       //已确认    - 道具处于确认状态
        // }
    "gold",
    "height",
    "large_icon",
    "more_icon": [],
    "props_type",
    "props_price",
    "props_createtime",
    "props_rank",
    "props_status",
    "state":,
    "props_extra": {
            "attr1": "属性1",
            "attr2": "属性2",
    },
    "icon",
    "props_name",
    "props_desc",
  }
]

跳转链接：
1. 道具详情页面 { name: 'PropDetail', params: { item: item }}

-->
<template>
  <div class="root">
    <PanelList :config="config" :content="propList" :selection="selection" v-on:panel_item_click="showPropDetail"></PanelList>
    <navs></navs>
  </div>
</template>
<script>
import Navs from "@/components/Navs.vue";
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'Crowd',
  components: {
    Navs,
    PanelList,
  },
  data: function() {
    return {
      config: {
        type: '1',          //面板样式
        title: `道具背包`,   //面板标题
        store: 'prop',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
      selection: {},
    };
  },
  computed: {
    propList () { return this.$store.state.prop.list; },
  },
  methods: {
    showPropDetail(item) {
      console.log('PropDetail', item);
      this.$router.push({ name: 'PropDetail', params: { item: item }})
    },
  },
  created() {
  },
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  background-color:white;margin-top:-8px
}
</style>
