<template>
  <div>
    <swiper style="margin-top:0.6rem;" :list="hotList" v-model="hotListIndex" @on-index-change="hotListOnIndexChange"></swiper>
    <panel header="热门游戏" :list="gameList" type="5" @on-img-error="onImgError"></panel>
  </div>
</template>
<script>
import {Swiper, Panel} from 'vux'

const baseList = [{
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vvsr72j20p00gogo2.jpg',
  title: '送你一朵fua'
}, {
  url: 'javascript:',
  img: 'https://ww1.sinaimg.cn/large/663d3650gy1fq66vw1k2wj20p00goq7n.jpg',
  title: '送你一辆车'
}]

export default {
  name: 'Games',
  components: {
    Swiper,
    Panel
  },
  data () {
    return {
      gameList: [],
      hotList: baseList,
      hotListIndex: 0,
    }
  },
  methods: {
      hotListOnIndexChange (index) {
        this.hotListIndex = index
      },
      // 发送请求 获取数据
      getGames() {
        let data = {func:'GameHome', control: 'game', oemInfo: this.GLOBAL.oemInfo}
        console.log('getPlayList', data)
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            //this.hotGame = res.data.hotGame
            //this.recommendList = res.data.games
            //this.gameList.splice(0, this.gameList.length);
            console.log(res.data)
            this.fillGames(res.data.games)
            this.GLOBAL.games = res.data.games
        });
      },
      fillGames(games) {
        games.forEach(element => {
          const item = {
            src: element.game_ico_uri,
            title: element.game_title,
            desc: element.provider_name
          }
          this.gameList.push(item)
        });
      },
      onImgError (item, $event) {
        console.log(item, $event)
      }
  },
  created() {
    if( this.GLOBAL.games == null ) {
      this.getGames()
    } else {
      this.fillGames(this.GLOBAL.games)
    }
  }
}
</script>