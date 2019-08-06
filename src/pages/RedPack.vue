<!-- 红包管理页面
-->
<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group title="红包管理">
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
        this.$router.push('/redPack/act');
      },
      sendRedPack() {
          this.remote.fetching({func:'SendRecPack', control: 'wechat',}).then(res => {
              if(res.code == 0) {
                  this.retMsg = res.data;
              }
          });
      },
  },
  created() {
    if(!this.userBase.uid) {
      this.$router.push('/login');
    }
  }
}
</script>