<template>
  <div>
    <div style="height:10px; width:100%; background-color:#FAFAFA"> </div>
    <div style="padding:0px; background-color: white;">
      <div style="background-color: #fafafa;">
          <div style="background-color: #d3a92c; padding:15px;">
              <flexbox>
              <flexbox-item :span="9">
                  <div class="flex-demo1">
                      <div>
                        <div style="display:inline-block">我的会员等级：</div>
                        <img :src="getVipImg(mine.vip_level)" class="imgDiv" />
                      </div>
                      <div><p>会员有效期至：{{this.GLOBAL.formatDateStr(new Date(mine.vip_end_time*1000), 'yyyy-MM-dd')}}</p></div>
                  </div>
              </flexbox-item>
              <flexbox-item :span="3"><div class="flex-demo1">
                <!--
                <img src="static/img/member/xufei.png" class="imgDiv2" />
                -->
                </div></flexbox-item>
              </flexbox>
          </div>
      </div>
    </div>

    <div style="height:10px; width:100%; background-color:#FAFAFA"> </div>
    <div style="padding: 0px; background-color: white;">
          <flexbox>
          <flexbox-item :span="9">
              <div class="flex-demo2">
                  <div>未提取<span style="color:black; font-size:17px; font-weight:620;">
                      <countup :end-val="gold" :duration="1" :start="doStart" :decimals=3></countup>
                      <!--{{this.GLOBAL.formatGameGold(mine.vip_usable_count)}}-->
                      </span>千克
                  </div>
                  <div><p>(满10千克可提取到钱包)</p></div>
              </div>
          </flexbox-item>
          <flexbox-item :span="3"><div class="flex-demo2" style="padding-left:0px;">
            <img src="static/img/member/tiqu1.png" class="imgDiv2" @click="vipDrawConfirm" v-if="gold>=10" />
            <img src="static/img/member/tiqu.png" class="imgDiv2" v-if="gold<10" />
            </div></flexbox-item>
          </flexbox>
    </div>

    <div v-if="drawLog.length>0" >
      <div style="height:10px; width:100%; background-color:#FAFAFA"> </div>
      <div>
          <p style="text-align:center;width:100%; background-color: white;padding-top:5px; top:0px; position: relative;">
            <span style="color:#CC9900; font-size:15px;font-weight:620;">近期提币记录</span>
          </p>
          <div style="background-color:white; padding:10px;"> 
            <flexbox v-for="(item, index) in drawLog" :key="index">
              <flexbox-item :span="7">
                  <div class="flex-demo3">
                    <span>{{GLOBAL.formatDateStr(new Date(item.draw_at*1000), 'MM-dd HH:mm:ss')}}</span>
                  </div>
              </flexbox-item>
              <flexbox-item :span="5">
                <div class="flex-demo3">
                    <span>{{GLOBAL.formatGameGold(item.draw_count)}}千克</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
          <p style="text-align:center;width:100%; background-color: white; padding:5px;">
            <span style="color: #35495e; font-size:13px;" @click="allDrawLog">查看更多>></span>
          </p>
      </div>
    </div>

  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Countup, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'MemberGold',
  directives: {
    TransferDom
  },
  components: {
    Flexbox, FlexboxItem, Group, Countup
  },
  props: [
    'mine'
  ],
  data () {
    return {
      doStart: false,
      gold: 1000,
      drawLog: [],
    }
  },
  methods: {
    getVipImg(vip_level) {
      return 'static/img/member/vip_'+vip_level+'.png'
    },
    allDrawLog() {
      this.$router.push({name: 'MemberDrawLog'})
    },
    vipDrawConfirm() {
        let that = this
        this.$vux.confirm.show({
            title: '输入提取游戏金数量(千克)',
            content: '输入提取游戏金数量(千克)',
            showInput: true,
            onConfirm (value) {
                if(that.checkRate(value)==false) {
                    that.showPluginAuto('输入无效数字')
                } else {
                    let draw_count = that.GLOBAL.gameGoldOrigin(value)
                    if(value < 10) {
                      that.showPluginAuto('提取数量不能少于10千克')
                    } else if(draw_count > that.mine.vip_usable_count) {
                      that.showPluginAuto('提取数量超出额度')
                    } else {
                      that.vipDraw(draw_count)
                    }
                }
            }
        })
    },
    vipDraw(draw_count) {
         let data = {
          func:'VipDraw',
          control: 'profile',
          uid: this.GLOBAL.uid,
          draw_count: draw_count,
          oemInfo: this.GLOBAL.oemInfo
        };
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if(res.data.errcode='success') {
              this.doStart = false
              this.mine.vip_usable_count = this.mine.vip_usable_count - draw_count
              this.gold = this.GLOBAL.formatGameGold(this.mine.vip_usable_count )
              this.doStart = true
              this.drawLog.unshift(res.data.ret)
            }
        });  
    },
    getDrawLog() {
         let data = {
          func:'VipDrawLog',
          control: 'profile',
          uid: this.GLOBAL.uid,
          last: 1,
          oemInfo: this.GLOBAL.oemInfo
        };
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if(res.data.errcode='success') {
                this.drawLog = res.data.ret
            }
        });  
    },
    checkRate(input) {
    　　var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
        return re.test(input)
    },
    showPlugin(msg) {
      this.$vux.alert.show({
        title: '提示',
        content: msg
      })
    },

    showPluginAuto(msg) {
      this.showPlugin(msg)
      setTimeout(() => {
        this.$vux.alert.hide()
      }, 3000)
    },
  },
  created() {
    let current_time = parseInt(new Date().getTime() / 1000)
    this.GLOBAL.vipGetNotifyTime = current_time
    if(this.mine.vip_usable_count > 0) {
      this.gold = this.GLOBAL.formatGameGold(this.mine.vip_usable_count);
      this.doStart = true
      this.getDrawLog()
    }
  }
}
</script>
<style lang="less" scoped>

.flex-demo1 {
  text-align: left;
  font-size: 15px;
  background-clip: padding-box;
}

.flex-demo2 {
  text-align: left;
  padding-left: 15px;
  font-size: 15px;
  color: #d3a92c;
  background-clip: padding-box;
}

.flex-demo3 {
  text-align: left;
  padding-left: 15px;
  font-size: 15px;
  color: #d3a92c;
  background-clip: padding-box;
  line-height: 25px;
  height: 25px;
}

.imgDiv {
  width: 50px;
  height: 20px;
  vertical-align: -webkit-baseline-middle;
  display:inline-block; 
  top: -5px; 
  position: relative;
}

.imgDiv2 {
  width: 60px;
  height: 25px;
  vertical-align: -webkit-baseline-middle;
}


</style>