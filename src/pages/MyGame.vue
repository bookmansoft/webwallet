<!-- 我玩过的游戏
-->
<template>
  <div>
    <ScrollList :config="config">
      <template v-slot:default="props">
          <div v-for="(item, index) in props.content" :key="index" class="gameItem">
            <flexbox @click.native="gotoCpInfo(item, index)">
              <flexbox-item :span="4" style="padding:0.3rem;">
                <div class="flex-demo-left">
                  <img :src="item.small_img_url" class="img-game-list">
                </div>
              </flexbox-item>
              <flexbox-item>
                <div style="padding-left:6px;">
                  <p>
                    <span style="font-size:15px;">{{item.game_title}}</span>
                  </p>
                  <br>
                  <p>
                    <span style="color: #888; font-size:14px;">{{item.game_desc}}</span>
                  </p>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
      </template>
    </ScrollList>
  </div>
</template>
<script>
import {
  Flexbox,
  FlexboxItem,
} from "vux";
import ScrollList from "@/components/ScrollList.vue";

export default {
  name: "MyGame",
  components: {
    Flexbox,
    FlexboxItem,
    ScrollList,
  },
  data() {
    return {
      config: {
        store: 'mygame',                                 //引用的数据仓库
        nodata: '/static/img/default/no-product.png',   //列表为空时的占位图片
      },
    };
  },
  methods: {
    gotoCpInfo(item, index) {
      this.$router.push({
        name: "GameInfo",
        params: { cpInfo: item },
      });
    },
  },
  created() {
    if(!this.$store.state.user.auth.uid) {
        this.$router.push('/login');
    }
  }
};
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
  width: 100%;
  height: 200px;
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