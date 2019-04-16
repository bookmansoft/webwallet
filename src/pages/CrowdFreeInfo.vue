<template>
  <div>
    <group>
        <flexbox>
            <flexbox-item :span="2.5" style="padding:0.3rem;">
            <div class="flex-demo-left">
                <img :src="crowdFreeItem.src" class="img-game-list" />
            </div></flexbox-item>
            <flexbox-item>
            <div style="padding-left:0px;">
                <p><span style="font-size:15px;">{{crowdFreeItem.title}}</span></p>
                <p><span style="color: #888; font-size:13px;">{{crowdFreeItem.group}}</span></p>
            </div>
            </flexbox-item>
        </flexbox>
    </group>
    <group>
        <div class="crowdFreeItem">
            <p><span>当前交易价(游戏金)</span></p>
            <flexbox>
                <flexbox-item :span="5" style="padding:0.3rem;">
                    <p><span style="color:red; font-size:16px;">1100千克</span></p>
                </flexbox-item>
                <flexbox-item>
                    <p><span style="color:red; font-size:13px;">↑ +100.000 (+10%)</span></p>
                </flexbox-item>
            </flexbox>
            <p><span>分时K线</span></p>
        </div>
    </group>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import { XButton, Tab, TabItem, Group, Flexbox, FlexboxItem} from 'vux'
import Navs from '@/components/Navs.vue'


export default {
  components: {
    Navs, Tab, XButton, TabItem, Group, Flexbox, FlexboxItem
  },
  data () {
    return {
      msg: '众筹',
      crowdFreeItem: null
    }
  },
  methods: {
    onItemClick(index) {
      console.log(this.tabIndex)
    },
  },
  created() {
      this.crowdFreeItem = this.$route.params.item
  }
}
</script>

<style scoped>
.crowdFreeItem {
  padding:8px; 
  height:300px;
}

.crowdFreeItem p {
  height: 30px;
  line-height: 30px;
}

.img-game-list {
    width: 65px;
    height: 65px;
    border-radius: 10%;
    margin-left: 4px;
}

.img-top {
  width:100%;
  height:180px;
  /*border-radius: 4%;*/
  border-top-left-radius:1.5em; 
  border-top-right-radius:1.5em; 
}
.imgDemo {
  width: 100%;
  height: auto;
}
.flex-left {
  text-align: left;
  padding-left: 15px;
}
.flex-right {
  text-align: right;
  padding-right: 15px;
}
</style>
