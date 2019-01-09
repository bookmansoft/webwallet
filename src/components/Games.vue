<template>
    <div>
       <scroller v-model="scrollerStatus" height="-100" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pulldown="showDown" :use-pullup="false" :pulldown-config="downobj" @on-pulldown-loading="selPullDown"><div>
        <!--<swiper style="margin-top:0.6rem;" :list="hotList" v-model="hotListIndex" @on-index-change="hotListOnIndexChange"></swiper>-->
        <!--<panel header="热门游戏" :list="gameList" type="5" @on-img-error="onImgError"></panel>-->
        <div style="height:5px;"></div>
        <div style="background-color: white">
          <div style="padding:10px 10px 0px 10px;"><img :src="recommendGame.src" class="img-top" /></div>
          <div><p style="font-size:15px;padding: 5px 0px 0px 10px;"><span style="color:red;">推荐</span><span style="margin-left:5px;">{{recommendGame.gameTitle}}</span></p></div>
          <div><p style="font-size:13px; color: #888;padding: 5px 0px 10px 10px;">{{recommendGame.gameProvider}}</p></div>
        </div>
        <div v-for="(item, index) in gameList" :key="index" class="gameItem">
          <flexbox @click.native="gotoCpInfo(item, index)">
            <flexbox-item :span="4" style="padding:0.3rem;">
              <div class="flex-demo-left">
                <img :src="item.src" class="img-game-list" />
              </div></flexbox-item>
            <flexbox-item>
              <div style="padding-left:6px;">
                <p><span style="font-size:15px;">{{item.title}}</span></p>
                <br />
                <p><span style="color: #888; font-size:14px;">{{item.desc}}</span></p>
              </div>
            </flexbox-item>
          </flexbox>
        </div>
        <br/>
      </div></scroller>
      <br/>
    </div>
</template>
<script>
import {Scroller, Swiper, Group, Panel, Flexbox, FlexboxItem} from 'vux'
import { setTimeout } from 'timers';

export default {
  name: 'Games',
  components: {
    Scroller, Swiper, Group, 
    Panel, Flexbox, FlexboxItem
  },
  data () {
    return {
      isShow: false,//是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
      showloading: false,
      textloading: '加载中',
      showDown: true,
      isbounce: true,
      lists: [],
      downobj: {
        content: '请下拉刷新数据',
        pullUpHeight: 50,
        height: 40,
        autoRefresh: false,
        downContent: '请下拉刷新数据',
        upContent: '请下拉刷新数据',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pulldown-'
      },
      
      scrollerStatus: {
        pullupStatus: 'default'
      },

      gameList: [],
      hotListIndex: 0,
      recommendGame: {
        gameTitle: '奔跑的悟空',
        src: 'static/img/game/game-3.jpg',
        gameProvider: '原石互娱'
      },
      cpFilter: [
        'xxxxxxxx-game-gold-boss-xxxxxxxxxxxx',
        'eb9d03c0-0ff9-11e9-a575-21541098fe6c',
        '324febe0-1246-11e9-865d-67171db95497',
        'b0a7c550-10b9-11e9-be28-7bc3b258896e',
      ]
    }
  },
  activated () {
      this.$refs.scroller.reset()
  },
  methods: {
      selPullDown () {    
        console.log('selPullDown')  
        this.getNewsList(false)
      },
      getNewsList(isEmpty) {
        let that = this
        setTimeout(()=>{
          that.scrollerReset()
        }, 1500)
      },

      scrollerReset() {
        this.$refs.scroller.donePulldown()
        this.$refs.scroller.reset({top: 0})
      },
      hotListOnIndexChange (index) {
        this.hotListIndex = index
      },
      infinite(done) {
        console.log('infinite')
          this.$refs.myScroller.resize();
        setTimeout(()=>{
          this.$refs.scroller.finishInfinite(2);
        })
      },
      //获取CP列表
      getCpList(page, num) {
        let data = {func:'List', control: 'cp', page: page, num: num, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            if(res.data.errcode == 'success') {
              //console.log('getCpList', res.data)
              //清空
              if(this.GLOBAL.cplist.length >0 ) {
                this.GLOBAL.cplist.splice(0, this.GLOBAL.cplist.length)
              }
              if(this.gameList.length >0 ) {
                this.gameList.splice(0, this.gameList.length)
              }
              //填充
              let cpList = res.data.cp.list
              cpList.forEach(cpItem => {
                if( this.cpFilter.indexOf(cpItem.cid)==-1) {
                  //从cp获取资源
                  let url = encodeURI(cpItem.url)
                  let data = {func:'GetCpProxy', control: 'cp', url: url, oemInfo: this.GLOBAL.oemInfo} 
                  this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
                    //console.log(res.data)
                    if(res.data.hasOwnProperty('result')) {
                      let result = res.data.result
                      this.GLOBAL.cplist.push({
                        cpItem: cpItem,
                        cpInfo: result
                      })
                      this.gameList.push({
                          src: result.game.small_img_url,
                          title: result.game.game_title,
                          desc: result.game.provider
                      })
                    }
                  })                 
                }
              });
            }
        });
      },

      gotoCpInfo(item, index) {
        console.log('goto cp info', index)
        let cpInfo = this.GLOBAL.cplist[index].cpInfo
        let cpItem = this.GLOBAL.cplist[index].cpItem
        this.$router.push({ name: 'GameInfo', params: { cpInfo: cpInfo, cpItem: cpItem }})
      },
      //获取CP数量
      getCpCount(page, num) {
        let data = {func:'CpCount', control: 'cp', oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
          if(res.data.errcode == 'success') {
            console.log('getCpCount', res.data.cp_count)
            if(res.data.cp_count > this.GLOBAL.cpCount) {
              this.GLOBAL.cpCount = res.data.cp_count
              this.getCpList(1, 10000)
            }
          }
        })
      },

      //填充视图列表
      fillGames(cpList) {
        this.gameList.splice(0, this.gameList)
        cpList.forEach(element => {
          this.gameList.push({
            src: element.cpInfo.game.small_img_url,
            title: element.cpInfo.game.game_title,
            desc: element.cpInfo.game.provider
          })
        });
      },

      onImgError (item, $event) {
        console.log(item, $event)
      }
  },
  created() {
    if(this.GLOBAL.cplist.length > 0) {
      this.fillGames(this.GLOBAL.cplist)
    } 
    this.getCpCount()
    this.isShow = true;
  }
}
</script>
<style lang="less" scoped>

.gameItem {
  background-color: white;
  margin-top: 0.4rem;
  padding: 0.2rem;
}
.img-game-list {
    width: 110px;
    height: 75px;
    border-radius: 12%;
    margin-left: 3px;
}
.img-top {
  width:100%;
  height:200px;
  border-radius: 4%;
}
.xs-plugin-pulldown-container {
 line-height: 40px;
 font-size: 18px;
 color: red;
}
.xs-plugin-pullup-container {
 line-height: 40px;
 font-size: 18px;
 color: red;
 }

</style>