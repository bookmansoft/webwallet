<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group title="红包测试">
        <div style="padding:15px;"><p>{{version}}</p></div>
    </group>
    <group v-if="retMsg!=null">
        <div style="padding:15px;"><p>{{retMsg}}</p></div>
    </group>
    <group label-width="3.5em" label-margin-right="2em" label-align="right">
        <div style="padding:15px;">
        <x-button type="primary" @click.native="sendRedPack">发一个红包试试</x-button>
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
      version: '领一个红包',
      headerTitle: '抢红包',
      retMsg: null
    }
  },
  methods: {
      onBack() {
        this.$router.go(-1);
      },
      sendRedPack() {
          let data = {func:'SendRecPack', control: 'wechat', oemInfo: this.GLOBAL.oemInfo}
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
              if(res.data.errcode=='success') {
                  this.retMsg = res.data.ret
              }
          });
      },
  },
  created() {
    if(!this.GLOBAL.userBase.uid) {
      this.$router.push('/login');
    }
  }
}
</script>