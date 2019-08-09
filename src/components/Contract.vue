<!-- 交易对界面

-->
<template>
  <div>
    <div v-if="isLoadMore && contractList.length > 0">
        <div v-for="(item, index) in contractList" :key="index" class="gameItem">
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
    </div>

    <div v-if="isLoadMore && contractList.length == 0">
        <no-data src="/static/img/default/no-product.png"></no-data>
    </div>
    <div v-if="!isLoadMore">
        <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
    </div>

  </div>
</template>
<script>

import {Flexbox, FlexboxItem, LoadMore} from 'vux'
import NoData from '@/components/NoData.vue'

export default {
    name: 'Contract',
    components: {
        Flexbox, FlexboxItem, NoData, LoadMore
    },   
    data () {
        return {
            contractList:[],
            isLoadMore: false
        }
    },
    methods: {
        // 获取发布数据
        getContractList() {
            this.remote.fetching({func:'ContractList', control: 'contract',}).then(res => {
                if(res.code == 0) {
                    this.contractList = res.data;
                    this.isLoadMore = true;
                }
            }).catch(e => {
                this.isLoadMore = true;
            })
        },
        contracInfo(item, index) {
            this.$router.push({ name: 'ContractInfo', params: { contract: item }})
        }
    },
    created() {
        if(!!this.$store.state.user.auth.uid) {
            this.getContractList();
        }
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
