<!-- 背包页面
-->
<template>
  <div class="root">
    <PanelList :config="config" v-on:panel_item_click="itemClick"></PanelList>
    <nav></nav>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'Pocket',
  components: {
    Nav,
    PanelList,
  },
  data: function() {
    return {
      config: {
        type: '2',          //面板样式
        title: '背包一览',   //面板标题
        store: 'pocket',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
    };
  },
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    itemClick(item) {
      this.$router.push({ name: 'ItemInfo', params: { item: item } });
    }
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
  background-color:white;
  margin-top:-8px
}
</style>
