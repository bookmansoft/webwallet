<!-- 道具交易市场
数据接口 
1. prop.listMarket
-->
<template>
  <div>
    <PanelList :config="config" v-on:panel_item_click="propSaleInfo"></PanelList>
  </div>
</template>
<script>

import PanelList from "@/components/PanelList.vue";

export default {
    name: 'PropSales',
    components: {
        PanelList,
    },   
    data () {
        return {
            config: {
                type: '1',
                title: '',
                store: 'propMarket',
                nodata: '/static/img/default/no-product.png',
            }
        }
    },
    methods: {
        propSaleInfo(item) {
            this.$router.push({ name: 'PropSaleInfo', params: { propSale: item }})
        },
    },
}
</script>

<style lang="less" scoped>

</style>
