<!-- 道具交易市场
数据接口
-->
<template>
  <div>
    <div v-if="isLoadMore && propList.length > 0">
        <div v-for="(item, index) in propList" :key="index" class="gameItem">
        <flexbox @click.native="propSaleInfo(item, index)">
            <flexbox-item :span="3" style="padding:0.3rem;">
            <div class="flex-demo-left" style="text-align:center;">
                <img :src="item.result.icon" class="img-game-list" />
            </div></flexbox-item>
            <flexbox-item>
            <div style="padding-left:0px;">
                <p><span style="color: #888; font-size:15px;">出售价：{{GLOBAL.toGamegoldKg(item.bid.fixed)}}千克</span></p>
                <br/>
                <p><span style="color: red; font-size:14px;">含金量：{{GLOBAL.toGamegoldKg(item.bid.value)}}千克</span></p>
                <p><span style="color: #888; font-size:10px;">{{item.addr}}</span></p>
            </div>
            </flexbox-item>
        </flexbox>
        </div>
    </div>
    <div v-if="isLoadMore && propList.length == 0">
        <no-data src="static/img/default/no-product.png"></no-data>
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
    name: 'PropSales',
    components: {
        Flexbox, FlexboxItem, LoadMore, NoData
    },   
    data () {
        return {
            propList:[],
            isLoadMore: false
        }
    },
    methods: {
        propSaleInfo(item, index) {
            this.$router.push({ name: 'PropSaleInfo', params: { propSale: item }})
        },
    },
    created() {
        this.remote.fetching({func:'prop.PropListMarket'}).then(res => {
            if(res.code == 0) {
                res.data.forEach(element => {
                    this.remote.get(encodeURI(element.cpurl + '/prop/' + element.oid)).then(res => {
                        element.result = res;
                        this.propList.push(element);
                    });
                });
            }
            this.isLoadMore = true
        }).catch(e => {
            console.log(e);
            this.isLoadMore = true
        })
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
    border-radius: 10%;
}

</style>
