<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group :title="title">
        <div>
            <div v-for="(item, index) in notifys" :key="index"> 
                <div style="padding:10px;">
                    <p><span style="font-size:13px;">{{GLOBAL.formatDateStr(new Date(item.create_time*1000), 'yyyy-MM-dd HH:mm:ss')}}</span></p>
                </div>
                <div style="height:3px; width:100%; background-color:#FAFAFA"></div>
            </div>
        </div>
    </group>
  </div>
</template>

<script>
import { XHeader, Flexbox, FlexboxItem, Group } from 'vux'

export default {
  name: 'Message',
  components: {
    XHeader, Flexbox, FlexboxItem, Group
  },
  props: [
    'mine'
  ],
  data () {
    return {
      headerTitle: '历史消息',
      title: '',
      notifyCount: 0,
      notifys: [],
    }
  },
  methods: {
    onBack() {
        this.$router.go(-1)
    },
    getNotify() {
         let data = {
          func:'NotifyList',
          control: 'wallet',
          uid: this.GLOBAL.uid,
          openid: this.GLOBAL.openid,
          last: 0,
          oemInfo: this.GLOBAL.oemInfo
        };
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if(res.data.errcode='success') {
                this.notifys = res.data.notifys
                this.notifyCount = res.data.notifys.length
                this.title = '共' + this.notifyCount + '条消息'
            }
        });  
    }
  },
  created() {
    if(this.GLOBAL.userProfile == null) {
      this.$router.push('/mine')
    }
    this.getNotify()
  }
}
</script>
<style lang="less" scoped>

.flex-demo {
  text-align: left;
  padding-left: 10px;
  font-size: 15px;
  background-clip: padding-box;
  background-color:white;
}

</style>