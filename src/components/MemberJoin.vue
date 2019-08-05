<!-- 会员特权展示组件

-->
<template>
  <div>
    <div style="padding:15px 15px 0px 15px;">
        <img src="/static/img/member/vip_6yuan.png" style="width:100%;height:auto;" />
    </div>
    <div><p style="text-align:center;width:100%;background-color: white;padding-top:5px;">
        <span style="color:#CC9900; font-size:16px;font-weight:620;">会员特权</span></p>
    </div>
    <div style="background-color: white; padding:15px;">
        <flexbox>
          <flexbox-item v-for="(item, index) in vipAuthoritysItems" :key="index">
            <div class="box"><img :src="item"></div>
          </flexbox-item>
        </flexbox>
    </div>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem } from 'vux'

const memberAuthoritys = () => [
  'static/img/member/medal1.png','static/img/member/lock1.png','static/img/member/gift1.png','static/img/member/fl1.png'
]

export default {
  name: 'MemberJoin',
  components: {
    Flexbox, FlexboxItem
  },
  data () {
    return {
      vipAuthoritysItems: memberAuthoritys()
    }
  },
  methods: {
         
  },
  created() {

  }
}
</script>
<style lang="less" scoped>

.box{
  text-align:center; 
}
.box img {
  width: 50px;
  height: 65px;
}

</style>