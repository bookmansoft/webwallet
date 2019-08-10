<!-- 消息中心
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <PanelList :config="config" :selection="selection" v-on:panel_item_click="itemClick"></PanelList>
  </div>
</template>

<script>
import { XHeader, } from 'vux'
import PanelList from "@/components/PanelList.vue";

export default {
  name: 'Message',
  components: {
    XHeader,PanelList,
  },
  data () {
    return {
      headerTitle: '历史消息',
      config: {
        type: '1',          //面板样式
        title: '消息一览',   //面板标题
        store: 'message',    //数据中心
        nodata: '/static/img/default/no-games.png',
      },
      selection: {},
    }
  },
  computed: {
    userBase() {return this.$store.state.user.auth},
  },
  methods: {
    itemClick(item) {
      this.$router.push({ name: 'MailReader', params: { data: item }})
    },
    onBack() {
        this.$router.push("/mine")
    },
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    }
  }
}
</script>
<style lang="less" scoped>
</style>