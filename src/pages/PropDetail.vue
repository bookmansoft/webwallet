<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> 
    <div id="gameName">
        <div id="topImg">
            <img :src="prop.result.large_icon">
        </div>
        <div id="centImg" class="backcolor-white" style="height:90px;">
            <div>
                <img :src="prop.result.icon">
            </div>
            <ul class="center-ul" style="position:relative; top:-80px;">
                <li><span class="prop-name">{{prop.result.props_name}}</span></li>
                <li class="color-999-provider">道具名称：{{prop.result.props_name}}</li>
                <li>
                <span class="color-999">装备</span>
                <!--
                <a class="play-btn float-right">
                  <span style="font-size:11px;">进入游戏</span>
                </a>
                -->
                </li>
            </ul>
        </div>      
        <div id="botImage" class="backcolor-white">
            <div @click="introduce">
                <p id="inIntroduce" class="bottom-orange">道具详情</p>
            </div>
            <div @click="gameNameImg">
                <p id="inGameNameImg">道具截图</p>
            </div>
            <div @click="gameProps">
                <p id="inGameProps">技能说明</p>
            </div>
        </div>      
        <div id="introduce">
            <div class="backcolor-white padding-rem">
                <p style="color: #888; font-size:14px;">{{prop.result.props_desc}}</p>
            </div>
        </div>
        <div id="gameNameImg" class="backcolor-white">
            <div>
                <img v-for="(item, index) in propIcons" :key="index" :src="item" alt="">
            </div>
        </div>
        <div id="gameProps" class="backcolor-white" >

        </div>
    </div>
        <!-- 三个按钮 -->
    <footer>
        <div class="smelt" @click="propFoundConfirm">
            <i>熔</i>
            <p>熔炼</p>
        </div>
        <div class="sell" @click="propSaleInput">
            <i>卖</i>
            <p>出售</p>
        </div>
        <div class="present" @click="propShare">
            <i>赠</i>
            <p>赠送</p>
        </div>
    </footer>
  </div>
</template> 
<script>
import {XHeader, Flexbox, FlexboxItem, TransferDomDirective as TransferDom } from 'vux'
import { introduce , gameNameImg , gameProps} from "../assets/js/gameName.js"

export default {
  directives: {
    TransferDom
  },
  components: {
    XHeader, Flexbox, FlexboxItem
  },
  data() {
    return {
        headerTitle: '道具详情',
        prop: {},
        propIcons: [],
        propShareIcon: ''
    };
  },
  methods: {
    onBack() {
        this.$router.push('/props')
    },
    //游戏详情
    introduce() { 
        introduce()
    },

    //游戏截图
    gameNameImg() { 
        gameNameImg() 
    },

    //获取道具
    gameProps() { 
        gameProps() 
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

    // 熔铸
    propFoundConfirm() {
        let that = this
        this.$vux.confirm.show({
            title: '操作提示',
            content: '确定将该道具熔铸?',
            onConfirm () {
                that.propFound()
            }
        })
    },

    propFound() {
        let prop = this.prop;
        console.log(prop);
				console.log(prop.current.rev);
				var data = {func: 'PropFound', control: 'prop', oemInfo: this.GLOBAL.oemInfo, txid: prop.current.rev};
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          console.log(res.data);
          if(res.data.errcode='success') {
              this.showPluginAuto('道具已被成功熔铸!')
              this.$router.go(-1)
          } else {
              this.showPluginAuto('道具熔铸操作失败!')
          }
        });
    },

    // 出售
    propSaleInput() {
        let that = this
        this.$vux.confirm.show({
            title: '输入出售价格，单位为千克',
            content: '输入出售价格，单位为千克',
            showInput: true,
            onConfirm (value) {
                if(that.checkRate(value)==false) {
                    that.showPluginAuto('请输入一个有效的出售价格')
                } else {
                    let amount = that.GLOBAL.gameGoldOrigin(value)
                    that.propSale(amount)
                }
            }
        })
    },

    checkRate(input) {
    　　var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 //判断正整数 /^[1-9]+[0-9]*]*$/ 
        return re.test(input)
    },

    propSale(amount) {
      let prop = this.prop;
        console.log(prop);
        console.log(prop.current.rev);
        var data = {
          func: 'PropSale', control: 'prop', oemInfo: this.GLOBAL.oemInfo,
          txid: prop.current.rev,
          index: prop.current.index,
          fixedPrice: amount,
          openid: this.GLOBAL.openid
        };
        console.log(data.index);
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          console.log(res.data);
          if(res.data.errcode='success') {
              this.showPluginAuto('道具已发布到交易市场!')
          } else {
              this.showPluginAuto('道具出售失败!')
          }
        });
    },

    getWxConfig() {
      const url = location.href.split("#")[0];
      let data = {func:'WechatConfig', control: 'wechat', url: url, oemInfo: this.GLOBAL.oemInfo}
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          console.log(res.data);
          this.$wechat.config(res.data.wxconfig)
      }).catch(res => {
          console.log(res);
      })
    },

    wxReady(prop) {
      let that = this
      that.$wechat.ready(function () {   //需在用户可能点击分享按钮前就先调用
          //分享给朋友
          let title = '游戏金道具分享'
          let desc = 'T10自行反坦克车'
          let link = that.GLOBAL.siteUri + '/?path=/prop/receive'
          let imgUrl = 'http://114.116.148.48:9701/image/3/prop_large_icon.jpg' //prop.result.large_icon
          let params = JSON.stringify({
            title:title,
            desc: desc,
            imgUrl: imgUrl
          })
          link = link + '&prop=' + params
          that.$wechat.onMenuShareAppMessage({ 
              title: title, // 分享标题
              desc: desc, // 分享描述
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
                // 设置成功
                //alert('设置成功')
              },
              fail: function() {
                //alert('设置失败')
              }
          })
          //分享到朋友圈
          that.$wechat.onMenuShareTimeline({
              title: title, // 分享标题
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
              // 用户点击了分享后执行的回调函数
              }
          })
      });
    },
    
    // 分享好友
    propShare() {
      if(this.propShareIcon == '') {
        return
      }
      
      let prop = this.prop;
      var data = {
        func: 'PropDonate', control: 'prop', oemInfo: this.GLOBAL.oemInfo,
        txid: prop.current.rev,
        index: prop.current.index,
        openid: this.GLOBAL.openid
      };
      this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          var rep = res.data;
          console.log("donate " + rep);
          if(rep.errcode == 'success') { 
            var url = "/pages/prop/index?openid=" + data.openid + "&pid=" + prop.pid + "&prop_name=" + prop.result.props_name;
            url += "&txid=" + prop.current.rev + "&prop_icon=" + prop.result.large_icon + "&act=send&raw=" + rep.ret.raw;
            console.log("url " + url);
            this.$wechat.miniProgram.navigateTo({ url: url });
          }
      });
    },
  },

  created() {
    if(!!!this.$route.params.prop) {
        this.$router.push('/props')
    } else {
        this.prop = this.$route.params.prop
        this.wxReady(this.prop)
        console.log('this.prop', this.prop.result.more_icon)
        this.propShareIcon = this.prop.result.large_icon
        this.prop.result.more_icon.forEach( item => {
             this.propIcons.push(item)
        });
        this.getWxConfig()
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