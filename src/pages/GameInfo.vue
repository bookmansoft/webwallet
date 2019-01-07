<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> 
    <div id="gameName">
        <div id="topImg">
            <img :src="gameInfo.large_img_url">
        </div>
        <div id="centImg" class="backcolor-white" style="height:130px;">
            <div>
                <img :src="gameInfo.icon_url">
            </div>
            <ul class="center-ul" style="position:relative; top:-75px;">
                <li>{{gameInfo.game_title}}</li>
                <li class="color-999">发行商：{{gameInfo.provider}}</li>
                <li>
                <span class="color-999">射击</span>
                <a class="play-btn float-right"><span style="font-size:11px;">进入游戏</span></a>
                </li>
                <li>
                <span class="color-999">128人玩过</span>
                <span class="color-orange float-right"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>编辑推荐</span>
                </li>
            </ul>
        </div>      
        <div id="botImage" class="backcolor-white">
            <div @click="introduce">
                <p id="inIntroduce" class="bottom-orange">详情</p>
            </div>
            <div @click="gameNameImg">
                <p id="inGameNameImg">游戏截图</p>
            </div>
            <div @click="gameProps">
                <p id="inGameProps">游戏道具</p>
            </div>
        </div>      
        <div id="introduce">
            <div class="backcolor-white padding-rem">
                <p>简介</p>
                <p style="color: #888; font-size:14px;">{{gameInfo.desc}}</p>
            </div>
            <div class="backcolor-white padding-rem">
                <p>游戏信息</p>
                <p><span>版本</span><span>v{{gameInfo.version}}</span></p>
                <p><span>开发者</span><span>{{gameInfo.provider}}</span></p>
            </div>
            <div class="backcolor-white padding-rem">
                <p>最近更新</p>
                <p><span>更新时间</span><span>{{gameInfo.publishTime}}</span></p>
                <p style="color: #888; font-size:14px;">{{gameInfo.update_content}}</p>
            </div>
        </div>
        <div id="gameNameImg" class="backcolor-white">
            <div>
                <img v-for="(item, index) in gameInfo.pic_urls" :key="index" :src="item" alt="">
            </div>
        </div>
        <div id="gameProps" class="backcolor-white" >
            <div class="game-props" v-for="(item, index) in cpProps" :key="index">
                <div>
                    <img :src="item.icon">
                </div>
                <div>
                    <p>{{item.props_name}}</p>
                    <p>&nbsp;<p>
                    <p>{{item.props_desc}}</p>
                    <a class="gp-btn" @click="buyProp(item)">购买</a>
                    <p class="color-red">{{item.props_price}}千克</p>
                </div>
            </div>
        </div>
    </div>
  </div>
</template> 
<script>
import {XHeader, Flexbox, FlexboxItem } from 'vux'
import { introduce , gameNameImg , gameProps} from "../assets/js/gameName.js"

export default {
  components: {
    XHeader, Flexbox, FlexboxItem
  },
  data() {
    return {
        headerTitle: '游戏详情',
        cpInfo: [],
        gameInfo: {},
        cpItem: {},
        times: "",
        cpAddr: '',
        // 游戏道具图标
        cpProps:[]
    };
  },
  methods: {
    onBack() {
        this.$router.push('/home')
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

    // 时间转换
    getTime(t) {
        var mydate = new Date(t * 1000);
        var a = mydate.getFullYear();
        var b = mydate.getMonth() + 1;
        var c = mydate.getDate();
        var time = "" + a + "年" + b + "月" + c + "日";
        return time
    },

    //生成随机字符串
    randomString(len) {
      len = len || 32;
      /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    
      var maxLen = $chars.length;
      var str = '';
      for (var i = 0; i < len; i++) {
        str += $chars.charAt(Math.floor(Math.random() * maxLen));
      }
      return str;
    },

    buyProp(item) {
        if(this.cpAddr == '' || this.GLOBAL.openid == '') {
            return;
        }
        let cid = this.cpItem.cid
        let uid = this.GLOBAL.openid
        let notifyurl = this.GLOBAL.apiUrl
        let order_sn = item.id + '-new-' + this.randomString(16)
        let price = this.GLOBAL.gameGoldOrigin(item.props_price)
        var url = "/pages/order/order?cid=" + cid + "&uid=" + uid + "&sn=" + order_sn;
        url += "&price=" + price + '&notifyurl=' + encodeURI(notifyurl) + '&returl=' + encodeURI(window.location.href) ;
        console.log(url);
        this.$wechat.miniProgram.navigateTo({ url: url });
    },

    getCpProps() {
        this.cpProps.splice(0, this.cpProps.length)
        this.cpInfo.proplist.forEach(element => {
            //从cp获取资源
            /*
            const url = this.cpItem.url + '/prop/' + element.id
            this.axios.get(url).then(res => {
                //console.log(res.data)
                let item = res.data
                item.props_price = this.GLOBAL.formatGameGold(item.props_price)
                this.cpProps.push(item)
            })
            */
            //const url = this.cpItem.url + '/prop/' + element.id
            let url = encodeURI(this.cpItem.url + '/prop/' + element.id)
            let data = {func:'GetCpProxy', control: 'cp', url: url, oemInfo: this.GLOBAL.oemInfo} 
            this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              console.log(res.data)
              if(res.data.hasOwnProperty('result')) {
                let item = res.data.result
                item.props_price = this.GLOBAL.formatGameGold(item.props_price)
                this.cpProps.push(item)
              }
            })        
        });
    },

    userToken() {
        if(this.GLOBAL.openid == '') {
            return
        }
        let data = {func:'UserToken', control: 'cp', oemInfo: this.GLOBAL.oemInfo,
            openid: this.GLOBAL.openid, 
            uid: this.GLOBAL.openid,
            cid: this.cpItem.cid
        }
        console.log(data)
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data)
            this.cpAddr = res.data.ret.data.addr
            console.log('this.cpAddr', this.cpAddr)
        });
    }
  },

  created() {
    if(!!!this.$route.params.cpInfo || !!!this.$route.params.cpItem) {
        this.$router.push('/Home')
    } else {
        this.cpInfo = this.$route.params.cpInfo
        this.cpItem = this.$route.params.cpItem
        this.gameInfo = this.cpInfo.game
        this.gameInfo.publishTime = this.getTime(this.gameInfo.publish_time)
        this.getCpProps()
        this.userToken()
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
  margin-top: 0.3rem;
}
/* 动作  冒险  标签 */
.center-ul > li:nth-child(3) > span {
  margin-top: 0.1rem;
  display: inline-block;
  width: 2.5rem;
  height: 1rem;
  line-height: 1rem;
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
</style>