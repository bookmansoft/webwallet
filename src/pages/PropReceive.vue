<!-- 道具接收页面
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <div id="gameName">
        <div id="topImg">
            <img :src="prop.imgUrl">
        </div>
    </div>
    <group>
        <cell title="道具" :value="prop.desc"></cell>
    </group>
    <div style="padding:15px;">
      <x-button @click.native="propRec()" type="primary" > 接收</x-button>
    </div>
  </div>
</template> 
<script>
import {XHeader, XButton, Group, Cell, Flexbox, FlexboxItem, TransferDomDirective as TransferDom } from 'vux'
import { setTimeout } from 'timers';

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader, Flexbox, FlexboxItem, XButton, Cell, Group
  },
  data() {
    return {
        headerTitle: '道具分享',
        prop: {}
    };
  },
  methods: {
    onBack() {
        this.$router.push('/props')
    },
    //游戏详情
    introduce() { 
        this.utils.introduce();
    },

    //游戏截图
    gameNameImg() { 
        this.utils.gameNameImg();
    },

    //获取道具
    gameProps() { 
        this.utils.gameProps();
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
      }, 2000)
    },

    propRec() {
      if(!this.prop.hasOwnProperty('raw')) {
        this.showPlugin('无效的道具分享')
        return;
      }

      this.remote.fetching({
        func: 'PropReceive', control: 'prop', 
        raw: this.prop.raw,
      }).then(res => {
          if(res.code == 0) { 
            this.showPlugin('道具已成功接收')
            setTimeout(()=>{
              this.$router.push('/props')
            }, 1000)
            
          }
      });
    }
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else {
      let prop = this.utils.getUrlKey('prop');
      this.prop = JSON.parse(prop);
      console.log('PropReceive', this.prop);
    }
  }
};
</script>

<style scoped>
#gameName {
  background-color: rgb(245, 245, 249);
}
.backcolor-white {
  background-color: white;
  font-size: 14px;
}
.float-right {
  float: right;
}
.color-red{
  color:red;
}
.color-999 {
  color: #999;
}
.color-999-provider {
  color: #999;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.prop-name {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.color-orange {
  color: rgb(255, 102, 0);
  margin-right: 0rem;
}
.padding-rem {
  padding: 0 0.625rem;
}
/* 进入游戏 */
.play-btn {
  color: rgba(255, 102, 0, 1);
  border: 1px solid;
  width: 3.6rem;
  text-align: center;
  height: 1.2rem;
  line-height: 1.1rem;
  border-radius: 1.3rem;
}
.play-btn:hover {
  background-color: rgba(255, 102, 0, 1);
  color: white;
}
#gameNameTop {
  padding: 0.625rem 0.4rem 0.4rem 0.4rem;
  background-color: rgb(242, 242, 242);
}
#gameNameTop > a:first-child {
  color: #888;
  font-size: 14px;
}
#gameNameTop > a:last-child {
  /*color: black;*/
  color: #888;
  font-size: 14px;
  height: 1.2rem;
  line-height: 1.2rem;
}
#gameNameTop > p {
  display: inline-block;
  text-align: center;
  width: 90%;
  height: 1.2rem;
  line-height: 1.2rem;
}
#gameName {
  width: 100%;
}
#gameName > #topImg {
  width: 100%;
  height: 12rem;
}
#gameName > #topImg > img {
  width: 100%;
  height: 100%;
}
#centImg {
  padding: 0.625rem;
}
#gameName > #centImg > div {
  width: 4.5rem;
  height: 4.5rem;
}
#gameName > #centImg > div > img {
  width: 100%;
  height: 100%;
  border-radius: 0.6rem;
}
#centImg > div {
  /* position: absolute; */
}
/* ul>li */
#centImg > .center-ul {
  display: inline-block;
  list-style: none;
  margin-top: 0;
  width: 68.5%;
  padding-left: 5.4rem;
}
.center-ul > li + li {
  margin-top: 0.75rem;
}
.center-ul > li:first-child {
  font-weight: bold;
  font-size: 15px;
  margin-top: 4px;
}
/* 动作  冒险  标签 */
.center-ul > li:nth-child(3) > span {
  margin-top: 0.1rem;
  display: inline-block;
  width: 2.5rem;
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  background-color: rgba(242, 242, 242, 1);
  /* border:.5px solid ; */
  /* background-color:#111; */
  border-radius: 1rem;
}
.center-ul > li:last-child > span > i {
  padding-right: 0.3rem;
  color: black;
}
/* 详情   游戏截图 */
#botImage {
  margin: 0.3rem 0 0.2rem 0;
  display: flex;
  justify-content: space-between;
  padding:0 2rem;
}
#botImage > div > p {
  height: 1.7rem;
  line-height: 1.7rem;
}
.bottom-orange {
  color: rgb(255, 102, 0);
  border-bottom: 0.2rem solid rgb(255, 102, 0);
}
/*      详情        */
#introduce > div {
  padding-bottom: 0.5rem;
}
#introduce > div + div {
  margin-top: 0.3rem;
}
#introduce > div > p:first-child {
  font-weight: 1000;
  font-size: 14px;
  padding: 0.45rem 0;
}
#introduce > div > p {
  line-height: 1.2rem;
}
#introduce > div > p > span:first-child {
  display: inline-block;
  width: 30%;
}
#introduce > div > p > span:last-child {
  display: inline-block;
  width: 60%;
}
#gameNameImg {
  padding: 0 0.2rem;
  display: none;
}
#gameNameImg > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
#gameNameImg > div > img {
  width: 49.8%;
  height: 6.5rem;
  margin-top: 0.1rem;
}
.game-props{
    display: flex;
    margin-right: 1rem;
    padding:0.5rem 0;
    border-bottom: 1px solid gray;
}
.game-props>div:first-child{
    width:3rem;
    height:3rem;
}
.game-props>div:first-child>img{
    width:3rem;
    height:3rem;
    border-radius: 0.5rem;
}
#gameProps {
  display: none;
}
#gameProps>div:last-child{
    border:none;
}
.game-props>div{
    width: 100%;
    margin-left:0.8rem;
    position: relative;
}
.game-props>div>p:last-child{
    position: absolute;
    bottom: 0;
}
.gp-btn{
    width:2.8rem;
    height:1.25rem;
    line-height: 1.25rem;
    text-align: center;
    border-radius: 1rem;
    margin-top: 0.2rem;
    float:right;
    color:white;
    background:rgb(255, 102, 0) ;
}


footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 2.5rem;
  background-color: white;
  border-top: 1px solid rgba(245, 245, 249, 1);
  display: flex;
}
footer > div {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid rgba(245, 245, 249, 1);
}
footer > div:nth-child(3) {
  border: none;
}
footer > div > i {
  border: 1px solid rgba(255, 102, 0, 1);
  color: rgba(255, 102, 0, 1);
  width: 1.2rem;  
  height: 1.2rem;
  border-radius: 50%;
  text-align: center;
  line-height: 1.3rem;
}

footer > div > p {
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
}
</style>