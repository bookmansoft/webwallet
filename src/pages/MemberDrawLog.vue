<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group :title="title">
        <div>
            <div v-for="(item, index) in drawLog" :key="index"> 
                <div style="padding:10px;">
                    <flexbox >
                    <flexbox-item :span="7">
                        <div class="flex-demo">
                            <p>提取</p>
                            <p><span style="font-size:13px;">{{GLOBAL.formatDateStr(new Date(item.draw_at*1000), 'yyyy-MM-dd HH:mm:ss')}}</span></p>
                        </div>
                    </flexbox-item>
                    <flexbox-item :span="5">
                        <div class="flex-demo">
                            <p><span>{{GLOBAL.formatGameGold(item.draw_count)}} 千克</span></p>
                            <p>&nbsp;</p>
                        </div>
                    </flexbox-item>
                    </flexbox>
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
  name: 'MemberDrawLog',
  components: {
    XHeader, Flexbox, FlexboxItem, Group
  },
  props: [
    'mine'
  ],
  data () {
    return {
      headerTitle: '全部提取记录',
      title: '',
      drawCount: 0,
      drawLog: [],
    }
  },
  methods: {
    onBack() {
        this.$router.go(-1)
    },
    getDrawLog() {
         let data = {
          func:'VipDrawLog',
          control: 'profile',
          last: 0,
          oemInfo: this.GLOBAL.oemInfo
        };
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if(res.data.errcode='success') {
                this.drawLog = res.data.ret
                res.data.ret.forEach(element => {
                    this.drawCount += element.draw_count
                });
                this.title = '累计提取' + this.drawLog.length + '次，共' + this.GLOBAL.formatGameGold(this.drawCount) + '千克'
            }
        });  
    }
  },
  created() {
    if(this.GLOBAL.userProfile == null) {
      this.$router.push('/mine')
    }
    this.getDrawLog()
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