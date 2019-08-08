<!-- 发送的红包页面
-->
<template>
  <div class="root">
    <PanelList :config="config" :content="sendData" v-on:panel_item_click="onItemClick"></PanelList>
    <navs></navs>
  </div>
</template>

<script>
import Navs from "@/components/Navs.vue";
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'RspSend',
  components: {
    Navs,
    PanelList,
  },
  data: function() {
    return {
      config: {
        type: '2',          //面板样式
        title: '',   //面板标题
        store: 'rpsSend',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
      selection: {},
    };
  },
  computed: {
    sendData() {
      return this.$store.state.rpsSend.list;
    },
  },
  methods: {
    onItemClick(item) {
      this.$router.push(`/redpackshared/receive/${item.id}`);
    },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
        return;
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
