<template>
  <div>
    <div class="split"> </div>
    <div class="member_car">
      <div class="member_car_up">
        <div class="flex-demo1">
            <div>
              <div style="display:inline-block">我的会员等级</div>
              <img :src="getVipImg(mine.vl)" class="imgDiv" />
            </div>
            <div>
              <p>会员有效期至：{{this.GLOBAL.formatDateStr(new Date(mine.vet*1000), 'yyyy年MM月dd日')}}</p>
            </div>
        </div>
      </div>
      <div class="member_car_down">
        <flexbox>
          <flexbox-item :span="7">
              <div class="flex-demo2">
                  <div>未提取: <span class="drawGold">{{this.GLOBAL.toGamegoldKg(mine.vcur)}}</span>千克</div>
                  <div><p>满10千克可提到钱包</p></div>
              </div>
          </flexbox-item>
          <flexbox-item :span="5"><div class="flex-demo22">
              <div class="vux-circle-demo">
                  <div style="width:60px;height:60px;">
                    <x-circle
                      :percent="percent"
                      :stroke-width="5"
                      stroke-color="#ff8312">
                      <span style="color:red;" v-if="this.percent >= 100" @click="vipDrawConfirm">提取</span>
                      <span style="color:#b3bfce;" v-else>提取</span>
                    </x-circle>
                  </div>
              </div>
            </div>
          </flexbox-item>
        </flexbox>
      </div>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group, Countup, XCircle, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'MemberGold',

  directives: {
    TransferDom
  },

  components: {
    Flexbox, FlexboxItem, Group, Countup, XCircle
  },

  props: [
    'mine'
  ],

  data () {
    return {
      gold: 1000,
      percent: 0,
      maxPercent: 0,
      timer: null,
      canDrawGold: 10,
    }
  },

  methods: {
    doCircle() {
      this.maxPercent = (this.gold / this.canDrawGold * 100) | 0;
      let interval = 50
      if(this.maxPercent > 100) {
        this.maxPercent = 100;
        interval = 10;
      }
      console.log('this.maxPercent', this.maxPercent)
      this.percent = 0
      this.setTimer(interval)
    },
    setTimer: function (val) {
      console.log('setTimer')
　　　　this.timer = setInterval( () => {
          this.percent += 5
          if(this.percent >= this.maxPercent) {
            clearInterval(this.timer)
          }
　　　　}, val);
　　},
    getVipImg(vip_level) {
      return 'static/img/member/vip_'+vip_level+'.png'
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
                    let draw_count = that.GLOBAL.toGamegoldOrigin(value)
                    if(value < 10) {
                      that.showPluginAuto('提取数量不能少于10千克')
                    } else if(draw_count > that.mine.vcur) {
                      that.showPluginAuto('提取数量超出额度')
                    } else {
                      that.vipDraw(draw_count)
                    }
                }
            }
        })
    },

    vipDraw(draw_count) {
        this.remote.fetching({
          func:'VipDraw',
          control: 'profile',
          draw_count: draw_count,
        }).then(res => {
            if(res.code == 0) {
              this.percent = 0;
              this.mine.vcur = this.mine.vcur - draw_count;
              this.gold = this.GLOBAL.toGamegoldKg(this.mine.vcur);
              this.showPluginAuto('提币成功');
              this.doCircle();
            }
        });  
    },

    checkRate(input) {
        //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
    　　var re = /^[0-9]+.?[0-9]*$/;
        return re.test(input);
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

  //#region 生命周期函数
  beforeDestroy: function () {
    clearInterval(this.timer)
  },

  created() {
    if(this.mine.vcur > 0) {
      this.gold = this.GLOBAL.toGamegoldKg(this.mine.vcur);
      this.doCircle();
    }
  },
  //#endregion
}
</script>
<style lang="less" scoped>

.vux-circle-demo {
  text-align: center;
}
.vux-circle-demo > div {
  margin-left: auto;
  margin-right: auto;
}

.split {
  height:10px; width:100%; background-color:#FAFAFA;
}
.member_car {
  padding: 10px 20px 10px 20px; 
  background-color: white; 
}
.member_car_up {
  padding: 20px 0px 20px 0px; 
  background-color: #d3a92c; 
  border-top-left-radius:1.5em; 
  border-top-right-radius:1.5em; 
  border:2px solid; 
  border-color: #d3a92c;
}
.member_car_down {
  padding: 20px 0px 20px 15px; 
  background-color: white;
  border-bottom-left-radius:1.5em; 
  border-bottom-right-radius:1.5em; 
  border:2px solid; 
  border-color: #d3a92c;
}
.flex-demo1 {
  text-align: left;
  padding-left: 15px;
  font-size: 15px;
  background-clip: padding-box;
}
.flex-demo2 {
  text-align: left;
  padding-left: 0px;
  font-size: 15px;
  color: #d3a92c;
  background-clip: padding-box;
}
.flex-demo22 {
  text-align: left;
  padding-left: 0px;
  font-size: 15px;
  background-clip: padding-box;
}
.drawGold {
  color:black; font-size:17px; font-weight:620;
}
.drawLogMore {
  text-align:center; background-color: white; padding:5px;
}
.drawLogMore span {
  color: #35495e; font-size:12px; font-weight:400;
}
.drawLogSpan {
  color:#CC9900; font-size:15px;font-weight:620;
}
.flex-demo3 {
  text-align: left;
  padding-left: 10px;
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