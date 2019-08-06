<!-- 红包首页，包含了抽红包和发红包的业务连接
-->
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group title="红包活动">
        <div style="padding:15px;">
          <x-button type="primary" @click.native="wheel">抽红包</x-button>
        </div>
    </group>
    <group v-if="retMsg!=null">
        <div style="padding:15px;"><p>{{retMsg}}</p></div>
    </group>
    <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <div style="padding:15px;">
          <x-button type="primary" @click.native="sendRedPack">发红包</x-button>
        </div>
    </group>
  </div>
</template>
<script>
import { XHeader, Group, XButton} from 'vux'

export default {
  components: {
    XHeader,  Group, XButton
  },
  data () {
    return {
      headerTitle: '抢红包',
      retMsg: null
    }
  },
  computed:{
    userBase() {return this.$store.state.user.auth},
  },
  methods: {
      onBack() {
        this.$router.go(-1);
      },
      wheel(){
        this.$router.push('/redpack/act');
      },
      sendRedPack() {
        this.$router.push('/redpackshared');
      },
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    }
  }
}
</script>