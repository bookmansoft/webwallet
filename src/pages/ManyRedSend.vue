<template>
  <div>
<box gap="10px 10px">
    <group>
      <x-input title="总金额"  placeholder="0.000"></x-input>
    </group>
          
    <group title="当前钱包剩余金额XXXX千克">
      <x-input title="红包个数"  placeholder="请填写个数"></x-input>
      
    </group>
    <group title="单个红包金额随机">
      <x-input placeholder="祝福语：恭喜发财，万事如意！"></x-input>
    </group>

    <flexbox>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6"><div align="center" style="font-size:20px;margin-top:45px;">总数10000千克</div></flexbox-item>
    </flexbox>
    <flexbox>
      <flexbox-item :span="3"></flexbox-item>
      <flexbox-item :span="6"><div align="center" style="margin-top:35px;"><x-button type="warn">塞游戏金进红包</x-button></div></flexbox-item>
    </flexbox>
    </box>
  </div>
</template>
<script>
import {Flexbox,FlexboxItem,Divider,XInput, Group, XButton, Cell,Box, } from 'vux'




export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    XInput,
    XButton,
    Group,
    Cell,
    Box,
  },
  data () {
    return {
      tabIndex: 0,

    }
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex)
    }
  }
}
</script>