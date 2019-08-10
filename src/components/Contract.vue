<!-- 交易对界面

-->
<template>
  <div>
    <ScrollList :config="config">
      <template v-slot:default="props">
        <div v-for="(item, index) in props.content" :key="index" class="gameItem">
            <flexbox @click.native="contracInfo(item, index)">
                <flexbox-item :span="3" style="padding:0.3rem;">
                <div class="flex-demo-left" style="text-align:center;">
                    <img src="/static/img/gamegold/logo.png" class="img-game-list" />
                </div></flexbox-item>
                <flexbox-item>
                <div style="padding-left:0px;">
                    <p><span style="color: #888; font-size:15px;">游戏金：{{assistant.toKg(item.src)}}千克</span></p>
                    <p><span style="color: red; font-size:14px;">比特币：{{item.dst/100000000}}</span></p>
                    <!--<p><span style="color: #888; font-size:10px;">{{item.addr}}</span></p>-->
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
} from 'vux'
import ScrollList from "@/components/ScrollList.vue";

export default {
    name: 'Contract',
    components: {
        Flexbox, 
        FlexboxItem, 
        ScrollList,
    },   
    data () {
        return {
            config: {
                store: 'contract',                              //引用的数据仓库
                nodata: '/static/img/default/no-product.png',   //列表为空时的占位图片
            },
        }
    },
    methods: {
        contracInfo(item, index) {
            this.$router.push({ name: 'ContractInfo', params: { contract: item }})
        }
    },
    created() {
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
    width: 4.0rem;
    height: 4.0rem;
    border-radius: 0%;
}

</style>
