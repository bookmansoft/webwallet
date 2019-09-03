<!--
cpInfo {
  `category_id`  '游戏类别',
  `category_title`  '类别名',
  `provider_id`  '供应商ID',
  `provider_name`  '供应商名',
  `ad_title`  '推广标题',
  `ranking`  '排名',
  `star_level`  '星级',
  `player_count`  '玩家人数',
  `down_count`  '下载次数',
  `comment_count`  '评论数',
  `game_version`  '版本号',
  `developer`  '开发者',
  `create_time`  '创建时间',
  `update_time`  '更新时间',
  `store_status`  '状态',
  `cpid`  'cpid',
  `cpurl`  'cpurl',
  `cp_addr`  'cp地址',
  `cp_name`  'cp_name',
  `game_title`  '标题',
  `game_link_url`  '游戏链接'
  `game_ico_uri`  '图标URI',
  `update_desc`  '更新描述',
  `game_resource_uri`  '资源URI, 展示大图',
  `game_screenshots`  '游戏截图',
  `game_desc`  '描述',
  `small_img_url`  '展示小图',
  `stock_price`  '当前资产价格',
  `stock_sum`  '当前资产数量',
  `grate`  '媒体分成',
  `hHeight`  '初次高度',
  `hBonus`  '历史分红',
  `hAds`  '历史分成',
}
-->
<template>
  <div>
    <!-- <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> -->
    <div id="gameName">
        <div id="topImg">
            <img :src="cpInfo.game_resource_uri">
        </div>
        <div id="centImg" class="backcolor-white" style="height:130px;">
            <div>
                <img :src="cpInfo.game_ico_uri">
            </div>
            <ul class="center-ul" style="position:relative; top:-75px;">
                <li>{{cpInfo.game_title}}</li>
                <li class="color-999-provider">发行商：{{cpInfo.developer}}</li>
                <li>
                <span class="color-999">射击</span>
                  <a class="play-btn float-right">
                    <span style="font-size:11px;" @click="gotoGame">{{playGameLable}}</span>
                  </a>
                </li>
                <li>
                <span class="color-999">128人玩过</span>
                <span class="color-orange float-right"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>编辑推荐</span>
                </li>
            </ul>
        </div> 
        <group title="长按二维码进入游戏">
          <div style="text-align:center; padding:15px;">
              <qrcode :value="gameWexQrcode" type="img" @touchstart.native="previewImage"></qrcode>
          </div>   
        </group>
        <div id="botImage" class="backcolor-white">
            <div @click="introduce"><p id="inIntroduce" class="bottom-orange">详情</p></div>
            <div @click="gameNameImg"><p id="inGameNameImg">游戏截图</p></div>
            <div @click="gameProps"><p id="inGameProps">游戏道具</p></div>
        </div>      
        <div id="introduce">
            <div class="backcolor-white padding-rem">
                <p>简介</p>
                <p style="color: #888; font-size:14px;">{{cpInfo.game_desc}}</p>
            </div>
            <div class="backcolor-white padding-rem">
                <p>游戏信息</p>
                <p><span>版本</span><span>v{{cpInfo.game_version}}</span></p>
                <p><span>开发者</span><span>{{cpInfo.developer}}</span></p>
            </div>
            <div class="backcolor-white padding-rem">
                <p>最近更新</p>
                <p><span>更新时间</span><span>{{cpInfo.update_time}}</span></p>
                <p style="color: #888; font-size:14px;">{{cpInfo.update_desc}}</p>
            </div>
            <!--
            <div style="padding:15px;">
              <x-button @click.native="test2()" type="primary"> 测试</x-button>
            </div>
            -->
        </div>
        <div id="gameNameImg" class="backcolor-white">
            <div>
                <img v-for="(item, index) in cpInfo.game_screenshots" :key="index" :src="item" alt="">
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
                    <p class="color-red">{{assistant.toKg(item.props_price)}}千克</p>
                </div>
            </div>
        </div>
        <div id="gameProps" class="backcolor-white">
          <div class="no-comment-box" v-if="commentsList.length==0">暂无评论</div>
          <div v-if="commentsList.length > 0">
            <div class="game-props" v-for="(item, index) in commentsList" :key="index">
                <div>
                    <img :src="item.avatar">
                </div>
                <div>
                    <p>
                      <span style="color:#666; font-size:15px;">{{item.nick}}</span>
                    </p>
                    <p>&nbsp;<p>
                    <p><span style="color:#888;">{{item.content}}</span></p>
                    <p>&nbsp;</p>
                    <a class="gp-btn" @click="buyProp(item)">体验</a>
                    <p class="color-red">{{assistant.toKg(item.props_price)}}千克</p>
                    <p style="text-align:right; width:100%;"><span style="color:#888;">{{item.timestamp}}</span></p>
                </div>
            </div>
          </div>
          <tabbar style="background-color: #FAFAFA; height:50px;">
            <flexbox>
              <flexbox-item>
                <div class="flex-demo">
                  <x-input placeholder="输入评论内容" v-model="msgInput" />
                </div>
              </flexbox-item>
              <flexbox-item :span="3">
                <div class="flex-demo" style="padding:10px;">
                  <x-button type="primary" @click.native="commentPub"><span style="font-size: 14px">发表</span></x-button>
                </div>
              </flexbox-item>
            </flexbox>
          </tabbar>
        </div>
    </div>
  </div>
</template> 
<script>
import {XHeader, Flexbox, FlexboxItem, Qrcode, Group, XInput, Tabbar, XButton } from 'vux'

export default {
  components: {
    XHeader, Flexbox, FlexboxItem, Qrcode, Group, XInput, Tabbar, XButton
  },
  data() {
    return {
        headerTitle: '游戏详情',
        playGameLable: '进入游戏',
        hasComments: false,
        commentsList: [],
        cpInfo: [],
        msgInput: "",
        times: "",
        vData: null,
        image: `${this.remote.appConfig.siteUri}/static/img/grcode.png`,
        gameWexQrcode: `${this.remote.appConfig.siteUri}/test`,
        // 游戏道具图标
        cpProps:[],
        imagelistbrowse: {
          type: Array,
          default: [],
        }
    };
  },
  computed:{
    userBase() {return this.$store.state.user.auth},
  },
  methods: {
    onBack() {
        this.$router.push('/home')
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

    // 时间转换
    getTime(t) {
        var mydate = new Date(t * 1000);
        var a = mydate.getFullYear();
        var b = mydate.getMonth() + 1;
        var c = mydate.getDate();
        var time = "" + a + "年" + b + "月" + c + "日";
        return time
    },

    async commentPub() {
      if(this.msgInput == "") {
        this.showPlugin("请输入评论内容")
        return
      }

      this.$store.dispatch('comment/add', {
        openid: this.userBase.openid, 
        uid: this.userBase.uid,
        cid: this.cpInfo.cpid,
        reply_id: 0,
        nick: this.userBase.nickname,
        avatar_url: this.userBase.avatar_uri,
        title: '',
        content: this.msgInput
      }).then(res => {
          if(res.code == 0) {
             this.$vux.toast.show({text: '评论已发布'})
             let current_time = parseInt(new Date().getTime() / 1000)
             this.commentsList.push({
                avatar: data.avatar_url,
                nick: data.nick,
                content: data.content,
                timestamp: this.utils.formatDateStr(new Date(current_time*1000), 'yyyy-MM-dd HH:mm'),
                create_at: current_time,
             })
             this.sortCommentList()
          } else {
            this.$vux.toast.show({text: '评论发布失败'})
          }
      })
    },

    previewImage: function(e) {
        let that = this
        let current = this.image
        that.$wechat.previewImage({
          current: current, // 当前显示图片的http链接
          urls: [current], // 需要预览的图片http链接列表
          success: function(res) {
          },
          fail: function(res) {
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

    /**
     * 跳转至模拟游戏
     */
    gotoGame() {
      let url = `${this.cpInfo.cpurl}/?data=${JSON.stringify(this.vData)}`;
      window.location.href = url;
    },

    buyProp(item) {
        if(!this.vData || !this.userBase.uid) {
            return;
        }

        this.$store.dispatch('wallet/pay', {
          cid: this.cpInfo.cpid,
          sn: `${item.id}-new-${this.randomString(16)}`,
          price: item.props_price,
        }).then(res => {
            if(res.code == 0) {
              this.showPlugin('道具已购买成功')
            } else {
              this.showPlugin(`购买失败${res.code}`);
            }
        })
    },

    sortCommentList() {
      if(this.commentsList.length >0 ) {
          this.commentsList.sort(function(a, b){
              return  b.create_at - a.create_at;
          });
      }
    },
    
    //获取评论列表
    getCommentList() {
      let cid = this.cpInfo.cpid;
      this.$store.dispatch('comment/list', {
        cid: cid,
      }).then(res => {
          if(res.code == 0) {
            res.data.forEach(element => {
              this.commentsList.push({
                avatar: element.avatar_url,
                nick: element.nick,
                content: element.content,
                timestamp: this.utils.formatDateStr(new Date(element.create_at*1000), 'yyyy-MM-dd HH:mm'),
                create_at: element.create_at,
              })
            });
            this.sortCommentList();
          }
      })
    },

    getCpProps() {
      this.$store.dispatch('cp/getProps', {
        cid: this.cpInfo.cpid,
      }).then(res => {
        console.log('getProps', res);
        if(res.code == 0) {
          this.cpProps = res.data;
        }
      })
    },

    test2() {
      this.$wechat.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
              var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              var speed = res.speed; // 速度，以米/每秒计
              var accuracy = res.accuracy; // 位置精度
              console.log(latitude + "." + longitude);
          }
      });
    }
  },

  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    } else {
      if(!this.$route.params.cpInfo) {
        this.$router.push('/Home');
      } else {
        this.cpInfo = this.$route.params.cpInfo;
        this.cpInfo.update_time = this.getTime(this.cpInfo.update_time);
        if(typeof this.cpInfo.game_screenshots == 'string') {
          this.cpInfo.game_screenshots = this.cpInfo.game_screenshots.split(',');
        }

        this.$store.dispatch('cp/UserToken', {
          cid: this.cpInfo.cpid,
        }).then(res => {
          if(res.code == 0) {
            this.vData = res.data;
          }
        });

        this.getCpProps();
        this.getCommentList();
      }
    }
  }
};
</script>

<style scoped>
#gameName {
  background-color: rgb(245, 245, 249);
}
.flex-demo {
  text-align: center;
  border-radius: 2px;
  background-clip: padding-box;
}
.no-comment-box {
  margin: 0 auto;
  text-align: center;
  /*border: 1px solid #f00;*/

  width: 700px;
  height: 100%;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 11;
  /*设定这个div的margin-top的负值为自身的高度的一半,margin-left的值也是自身的宽度的一半的负值.*/ 
    /*高为400,那么margin-top为-200px*/ 
    /*宽为700那么margin-left为-350px;*/ 
  margin: 150px 0 0 -350px;
}

.comment-footer {
  position: relative; 
  background-color: red;
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
    border-bottom: 10px solid #fafafa;
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