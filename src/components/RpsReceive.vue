<!-- 收到的利是页面
-->
<template>
  <div class="root">
    <PanelList :config="config" v-on:panel_item_click="itemClick"></PanelList>
    <Navi></Navi>
  </div>
</template>

<script>
import Navi from "@/components/Navi.vue";
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'RspReceive',
  components: {
    Navi,
    PanelList,
  },
  data: function() {
    return {
      config: {
        type: '1',          //面板样式
        title: '',   //面板标题
        store: 'rpsReceive',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
    };
  },
  methods: {
    itemClick(data) {
      this.$router.push(`/redpackshared/receive/${data.send_id}`);
    }
  },
  created() {
  },
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  background-color:white;
  margin-top:-8px;
}
</style>
