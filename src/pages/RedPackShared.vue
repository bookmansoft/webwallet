<!-- 多人红包管理页面
-->
<template>
  <div>
    <tab>
      <tab-item selected @on-item-click="onTabClick">领取的红包</tab-item>
      <tab-item @on-item-click="onTabClick">发出的红包</tab-item>
      <tab-item @on-item-click="onTabClick">发红包</tab-item>
    </tab>
    <div v-show="tabIndex==0">
      <RpsReceive></RpsReceive>
    </div>
    <div v-show="tabIndex==1">
      <RpsSend></RpsSend>
    </div>
    <div v-show="tabIndex==2">
    </div>
  </div>
</template>
<script>
import RpsReceive from '@/components/RpsReceive.vue'
import RpsSend from '@/components/RpsSend.vue'

import {
  Tab,
  TabItem,
} from "vux";
import moment from "moment";

export default {
  components: {
    Tab,
    TabItem,
    RpsReceive,
    RpsSend,
  },
  data() {
    return {
      tabIndex: 0,
    };
  },
  computed:{
    userBase() {return this.$store.state.user.auth},
  },
  methods: {
    onTabClick(index) {
      this.tabIndex = index;

      if (index == 0) { 
        //我领取的红包
      } else if (index == 1) { 
        //我发出的红包
      } else if (index == 2) { 
        //发红包
        this.$router.push(`/redpackshared/send`);
      }
    },
  },
  created: function() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    }
  }
};


</script>

<style scoped>
#imgDiv {
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 15px;
  margin-right: 15px;
}
.groupTitle {
  font-size: 16px;
  margin-bottom: 20px;
}
.input {
  font-size: 20px;
}
.text {
  font-size: 20px;
  line-height: 36px;
}
</style>