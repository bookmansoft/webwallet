<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> 
    <div v-if="!!gameInfo">
        <x-img :src="gameInfo.large_img_url" />
        <flexbox>
            <flexbox-item :span="2">
                <x-img :src="gameInfo.icon_url" class="game-icon" />
                <br/><br/><br/>
                <p>&nbsp;</p>
            </flexbox-item>
            <flexbox-item :span="6">
                <div class="game-intro">
                    <p class="title">{{gameInfo.game_title}}</p>
                    <p class="provider">{{gameInfo.provider}}</p>
                                    <br/><br/>
                <p>&nbsp;</p>
                </div>
            </flexbox-item>
            <flexbox-item :span="4" style="v">
                <div class="game-evaluate"> 
                    <p class="mark">9.0</p>
                    <p>评分</p>
                    <br/>
                    <p><x-button mini type="primary" text="进入" @click.native="gotoGame()"></x-button></p>
                    <br/>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
    <tab :line-width="3" custom-bar-width="60px" v-model="tabIndex">
      <tab-item v-for="(item, index) in tabItems" :key="index" @on-item-click="onItemClick">
        <span style="font-size:15px;font-weight:500;">{{item.label}}</span>
      </tab-item>
    </tab>
  </div>
</template> 
<script>
import {XHeader, XImg, Flexbox, FlexboxItem, Qrcode, Group, XButton, Tab, TabItem } from 'vux'

export default {
  components: {
    XHeader, Flexbox, FlexboxItem, Qrcode, Group, XImg, XButton, Tab, TabItem
  },
  data() {
    return {
        headerTitle: '游戏详情',
        cpInfo: [],
        gameInfo: {},
        cpItem: {},
        times: "",
        cpAddr: '',
        image: 'https://mini.gamegold.xin/gg-wechat-client/static/img/grcode.png',
        gameWexQrcode: 'http://mini.gamegold.xin/wxopen/test',
        // 游戏道具图标
        cpProps:[],
        imagelistbrowse: {
          type: Array,
          default: [],
        },
        tabIndex: 0,
        tabItems: [
          {label:'详情'},
          {label:'评价'},
          {label:'在售道具'}
        ]
    };
  },
  mounted() {

  },
  methods: {
    onBack() {
        this.$router.push('/home')
    },
    onItemClick(index) {
      console.log(this.tabIndex)
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

    previewImage: function(e) {
        let that = this
        let current = this.image
        that.$wechat.previewImage({
          current: current, // 当前显示图片的http链接
          urls: [current], // 需要预览的图片http链接列表
          success: function(res) {
            console.log('success', res)
            alert('success', res)
          },
          fail: function(res) {
            console.log(res)
            alert('fail', res)
          }
        })
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

    gotoGame() {
      let cname = this.cpItem.name
      let cid = this.cpItem.cid
      let addr = this.cpAddr
      let game = this.gameInfo.game_title
      let gameUrl = this.gameInfo.large_img_url
      /*
      let gameUrl = 'https://mini.gamegold.xin/proxy/cp01/index.html?' + cname + '/' + addr
      window.location.href = gameUrl
      */
      const url = "/pages/test/test?cid=" + cid + "&addr=" + addr + "&game=" + game + "&gameUrl=" + gameUrl;
      this.$wechat.miniProgram.navigateTo({ url: url })
    },

    buyProp(item) {
        if(this.cpAddr == '' || this.GLOBAL.openid == '') {
            return;
        }
        let cid = this.cpItem.cid
        let uid = this.GLOBAL.openid
        let notifyurl = this.GLOBAL.apiUrl
        let order_sn = item.id + '-new-' + this.randomString(16)
        let price = this.GLOBAL.toGamegoldOrigin(item.props_price)
        var url = "/pages/order/order?cid=" + cid + "&uid=" + uid + "&sn=" + order_sn;
        url += "&price=" + price + '&notifyurl=' + encodeURI(notifyurl) + '&returl=' + encodeURI(window.location.href) ;
        console.log(url);
        this.$wechat.miniProgram.navigateTo({ url: url });
    },

    getCpProps() {
        this.cpProps.splice(0, this.cpProps.length);
        this.cpInfo.proplist.forEach(element => {
            //从cp获取资源
            this.remote.get(encodeURI(this.cpItem.url + '/prop/' + element.id)).then(res => {
                res.props_price = this.GLOBAL.toGamegoldKg(res.props_price);
                this.cpProps.push(res);
            })        
        });
    },

    userToken() {
        if(!this.GLOBAL.openid) {
            return;
        }
        this.remote.fetching({func:'cp.UserToken', cid: this.cpItem.cid}).then(res => {
          if(res.code == 0) {
            this.cpAddr = res.data;
          }
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
        this.getCpProps();
        this.userToken();
    }
  }
};
</script>

<style scoped>
.game-icon {
  padding-left: 8px;
  width: 100%;
  height: 100%;
  border-radius: 0.9rem;
}
.game-intro {
  display: inline-block;
  color: #999;
  padding-left: 10px;
}

.game-intro p {
  line-height: 30px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 90%;
}

.game-intro .title {
  color: black;
  font-size: 16px;
}

.game-evaluate {
    padding: 5px;
    text-align: center;
}

.game-evaluate .mark {
    color: rgb(10, 173, 119);
    font-size: 30px;
}

.game-intro provider {
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
</style>