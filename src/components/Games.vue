<template>
  <div>
    <swiper style="margin-top:0.6rem;" :list="hotList" v-model="hotListIndex" @on-index-change="hotListOnIndexChange"></swiper>
    <!--<panel header="热门游戏" :list="gameList" type="5" @on-img-error="onImgError"></panel>-->
    
    <group v-for="(item, index) in gameList" :key="index">
      <flexbox @click.native="gotoCpInfo(item, index)">
        <flexbox-item :span="4" style="padding:0.5rem;">
          <div class="flex-demo-left">
            <img :src="item.src" class="img-game-list" />
          </div></flexbox-item>
        <flexbox-item>
          <div>
            <p><span>{{item.title}}</span></p>
            <br />
            <p><span style="color: #888; font-size:0.3rem;">{{item.desc}}</span></p>
          </div>
        </flexbox-item>
      </flexbox>
    </group>
    
  </div>
</template>
<script>
import {Swiper, Group, Panel, Flexbox, FlexboxItem} from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '游戏金链'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '百谷王钱包'
}]

export default {
  name: 'Games',
  components: {
    Swiper, Group, 
    Panel, Flexbox, FlexboxItem
  },
  data () {
    return {
      gameList: [],
      hotList: baseList,
      hotListIndex: 0,
      cpFilter: [
        'xxxxxxxx-game-gold-boss-xxxxxxxxxxxx'
      ]
    }
  },
  methods: {
      hotListOnIndexChange (index) {
        this.hotListIndex = index
      },

      //获取CP列表
      getCpList(page, num) {
        let data = {func:'List', control: 'cp', page: page, num: num, oemInfo: this.GLOBAL.oemInfo}
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            if(res.data.errcode == 'success') {
              console.log('getCpList', res.data)
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
                  this.axios.get(cpItem.url).then(res => {
                    this.GLOBAL.cplist.push({
                      cpItem: cpItem,
                      cpInfo: res.data
                    })
                    this.gameList.push({
                        src: res.data.game.small_img_url,
                        title: res.data.game.game_title,
                        desc: res.data.game.provider
                    })
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
  }
}
</script>
<style lang="less" scoped>

.img-game-list {
    width: 7.8rem;
    height: 4.6rem;
    /*border-radius: 12%;*/
}

</style>