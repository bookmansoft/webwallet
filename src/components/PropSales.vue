<!-- 道具交易市场
数据接口 
1. prop.PropListMarket
-->
<template>
  <div>
    <PanelList :config="config" :content="propList" v-on:panel_item_click="propSaleInfo"></PanelList>
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
    computed: {
        propList() { return this.$store.state.propMarket.list; }
    },
    methods: {
        propSaleInfo(item) {
            this.$router.push({ name: 'PropSaleInfo', params: { propSale: item }})
        },
    },
    created() {
    }
}
</script>

<style lang="less" scoped>

</style>
