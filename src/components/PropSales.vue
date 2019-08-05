<!-- 道具交易市场
数据接口 
1. prop.PropListMarket
-->
<template>
  <div>
    <div v-if="isLoadMore && propList.length > 0">
        <panel :header="panelTitle" :list="propList" :type="panelType" @on-click-item="propSaleInfo"></panel>
    </div>
    <div v-if="isLoadMore && propList.length == 0">
        <no-data src="/static/img/default/no-product.png"></no-data>
    </div>
    <div v-if="!isLoadMore">
        <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
    </div>
  </div>
</template>
<script>

import { Flexbox, FlexboxItem, LoadMore, Panel, } from 'vux'
import NoData from '@/components/NoData.vue'

export default {
    name: 'PropSales',
    components: {
        Flexbox, FlexboxItem, LoadMore, NoData, Panel,
    },   
    data () {
        return {
            panelTitle: '',
            panelType: "1",
            propList:[],
            isLoadMore: false
        }
    },
    methods: {
        propSaleInfo(item) {
            this.$router.push({ name: 'PropSaleInfo', params: { propSale: item }})
        },
    },
    created() {
        this.remote.fetching({func:'prop.PropListMarket'}).then(res => {
            if(res.code == 0) {
                console.log('PropListMarket', res.data.list);
                res.data.list.forEach(element => {
                    this.remote.get(encodeURI(element.cpurl + '/prop/' + element.oid)).then(res => {
                        Object.assign(element, res);

                        element.src = element.icon;
                        element.title = element.props_name;
                        element.desc = `出售价 ${this.gamegold.toKg(element.bid.fixed)}千克, 含金量 ${this.gamegold.toKg(element.bid.value)}千克`;

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
