<template>
  <div>
    <group>
      <div style="background-color: #fafafa;">
          <div style="background-color: #d3a92c; padding:15px;">
              <flexbox>
              <flexbox-item :span="10">
                  <div class="flex-demo1">
                      <div>
                        <div style="display:inline-block">我的会员等级：</div>
                        <img src="static/img/member/vip_1.png" class="imgDiv" />
                      </div>
                      <div><p>会员有效期至：{{this.GLOBAL.formatDateStr(new Date(time*1000), 'yyyy-MM-dd')}}</p></div>
                  </div>
              </flexbox-item>
              <flexbox-item :span="2"><div class="flex-demo2">
                <!--
                <img src="static/img/member/xufei.png" class="imgDiv2" />
                -->
                </div></flexbox-item>
              </flexbox>
          </div>
      </div>
    </group>

    <group>
      <div style="padding: 15px;">
          <flexbox>
          <flexbox-item :span="8">
              <div class="flex-demo2">
                  <div>
                    <p>未提取游戏币  <span style="color:black; font-size:20px; font-weight:620;">{{gold}}</span> 千克</p>
                  </div>
                  <div><p>(满10千克可提取到钱包)</p></div>
              </div>
          </flexbox-item>
          <flexbox-item :span="4"><div class="flex-demo2">
            <img src="static/img/member/tiqu.png" class="imgDiv2" />
            </div></flexbox-item>
          </flexbox>
      </div>
    </group>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Group } from 'vux'

export default {
  name: 'MemberGold',
  components: {
    Flexbox, FlexboxItem, Group
  },
  props: [
    'gold', 'time', 'vip'
  ],
  data () {
    return {
      
    }
  },
  methods: {
         
  },
  created() {

  }
}
</script>
<style lang="less" scoped>

.flex-demo1 {
  text-align: left;
  font-size: 16px;
  padding-left: 10px;
  border-radius: 4px;
  background-clip: padding-box;
}

.flex-demo2 {
  text-align: left;
  font-size: 14px;
  padding-left: 10px;
  border-radius: 4px;
  color: #d3a92c;
  background-clip: padding-box;
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
  width: 80px;
  height: 30px;
  vertical-align: -webkit-baseline-middle;
}

.flex-demo2 {
  text-align: center;
  font-size: 16px;
  border-radius: 4px;
  background-clip: padding-box;
}

</style>