<!-- 道具竞拍界面
数据接口
1. $route.params.propSale 指定道具的数据描述对象，由上级页面传入
2. prop.PropBuy 竞拍指定道具
-->
<template>
    <div>
        <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> 
        <group>
            <flexbox>
                <flexbox-item :span="3" style="padding:0.3rem;">
                <div class="flex-demo-left" style="text-align:center;">
                    <img :src="propSale.icon" class="img-game-list" />
                </div></flexbox-item>
                <flexbox-item>
                <div style="padding-left:0px;">
                    <p><span style="color: #888; font-size:15px;">{{propSale.props_name}}</span></p>
                    <p><span style="color: #888; font-size:15px;">{{propSale.props_desc}}</span></p>
                    <p><span style="color: red; font-size:15px;">出售价 {{gamegold.toKg(propSale.bid.fixed)}}千克(含金量{{gamegold.toKg(propSale.bid.value)}}千克)</span></p>
                </div>
                </flexbox-item>
            </flexbox>
        </group>
        <group label-width="3.5em" label-margin-right="2em" label-align="right" style="position: relative; top:10px;">
            <div style="padding: 10px;">
                <x-button type="primary" @click.native="propBuyConfirm">购买</x-button>
            </div>
        </group>
    </div>
</template>
<script>

import {XHeader, XButton, Group, Flexbox, FlexboxItem} from 'vux'
export default {
    name: 'ContractInfo',
    components: {
        XHeader, XButton, Flexbox, FlexboxItem, Group
    },   
    data () {
        return {
            headerTitle: '道具交易详情',
            propSale: null
        }
    },
    methods: {
        propBuy() {
            this.remote.fetching({
                func:'prop.PropBuy', 
                pid: this.propSale.pid,
                price: this.propSale.bid.fixed,
            }).then(res => {
                if(res.code == 0) {
                    this.showPluginAuto('道具交易成功!')
                    this.$router.go(-1);
                } else {
                    this.showPluginAuto('道具交易失败!')
                }
            }).catch(res => {
                console.log(res);
            });
        },
        onBack() {
            this.$router.go(-1);
        },
        showPlugin(msg) {
        this.$vux.alert.show({
            title: '提示',
            content: msg
        })
        },

        showPluginAuto(msg) {
        this.showPlugin(msg)
            setTimeout(() => {
                this.$vux.alert.hide()
            }, 2000)
        },
        propBuyConfirm() {
            let that = this
            this.$vux.confirm.show({
                title: '操作提示',
                content: '确定购买这个道具?',
                onConfirm () {
                    that.propBuy()
                }
            })
        },
    },
    created() {
        if(!!this.$route.params.propSale) {
            this.propSale = this.$route.params.propSale
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
