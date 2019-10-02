<!-- 我的道具列表
数据接口：
1. prop.list -> propList 
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
    "prop_name",
    "prop_desc",
    "prop_type",
    "prop_price",
    "prop_rank",
    "icon",
    "large_icon",
    "more_icon": [],
  }
]

跳转链接：
1. 道具详情页面 { name: 'PropDetail', params: { item: item }}

-->
<template>
  <div class="root">
    <PanelList :config="config" v-on:panel_item_click="showPropDetail"></PanelList>
    <nav></nav>
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'Crowd',
  components: {
    Nav,
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
    };
  },
  methods: {
    showPropDetail(item) {
      console.log('PropDetail', item);
      this.$router.push({ name: 'PropDetail', params: { item: item }})
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
  background-color:white;margin-top:-8px
}
</style>
