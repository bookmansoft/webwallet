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
                <p><span style="color: #888; font-size:15px;">出售价：{{GLOBAL.formatGameGold(item.bid.fixed)}}千克</span></p>
                <br/>
                <p><span style="color: red; font-size:14px;">含金量：{{GLOBAL.formatGameGold(item.bid.value)}}千克</span></p>
                <!--<p><span style="color: #888; font-size:10px;">{{item.addr}}</span></p>-->
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
        // 获取发布数据
        PropListMarket() {
            let data = {func:'PropListMarket', control: 'prop', oemInfo: this.GLOBAL.oemInfo};
            this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
                console.log(res.data);
                //this.propList = res.data.ret;
                if(res.data.errcode='success') {
                    res.data.ret.forEach(element => {
                        this.getCpById(element)
                    });
                }
                this.isLoadMore = true
            }).catch(res => {
                console.log(res);
                this.isLoadMore = true
            })
        },
        
        propSaleInfo(item, index) {
            this.$router.push({ name: 'PropSaleInfo', params: { propSale: item }})
        },

        getCpById(marketProp) {
            let data = {func:'ById', control: 'cp', cid: marketProp.cid, oemInfo: this.GLOBAL.oemInfo};
            this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
                console.log('cp', res.data)
                if(res.data.errcode='success') {
                    let url = res.data.result.url
                    this.getPropFromCp(marketProp, url)
                }
            })
        },

        getPropFromCp(marketProp, cpurl) {
          let url = encodeURI(cpurl + '/prop/' + marketProp.oid)
          let data = {func:'GetCpProxy', control: 'cp', url: url, oemInfo: this.GLOBAL.oemInfo} 
          this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
              if(res.data.hasOwnProperty('result')) {
                  marketProp.result = res.data.result
                  this.propList.push(marketProp)
              }
        })

      },
    },
    created() {
        this.PropListMarket();
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
