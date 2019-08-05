<!-- 交易对详情展示页面
-->
<template>
    <div>
        <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header> 
        <group>
            <flexbox>
                <flexbox-item :span="3" style="padding:0.3rem;">
                <div class="flex-demo-left" style="text-align:center;">
                    <img src="/static/img/gamegold/logo.png" class="img-game-list" />
                </div></flexbox-item>
                <flexbox-item>
                <div style="padding-left:0px;">
                    <p><span style="color: #888; font-size:15px;">游戏金：{{gamegold.toKg(contract.src)}}千克</span></p>
                    <p><span style="color: red; font-size:14px;">比特币：{{contract.dst/100000000}}</span></p>
                    <!--<p><span style="color: #888; font-size:10px;">{{item.addr}}</span></p>-->
                </div>
                </flexbox-item>
            </flexbox>
        </group>
        <group title="比特币接收地址" style="position: relative; top:10px;">
            <p style="padding:5px;">{{contract.addr}}</p>
        </group>
        <group label-width="3.5em" label-margin-right="2em" label-align="right" style="position: relative; top:20px;">
            <div style="padding:10px;">
                <x-button type="primary" @click.native="contractConfirm">签署交易</x-button>
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
            headerTitle: '交易对详情',
            contract: null
        }
    },
    methods: {
        // 获取发布数据
        onBack() {
            //this.$router.push('/home')
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
        contractConfirm() {
            let that = this
            this.$vux.confirm.show({
                title: '操作提示',
                content: '确定签署该笔交易?',
                onConfirm () {
                    that.contractPromise()
                }
            })
        },
        contractPromise() {
            this.remote.fetching({
                func:'ContractPromise', 
                control: 'contract',
                txid: this.contract.current.hash,
            }).then(res => {
                if(res.code == 0) {
                    this.showPluginAuto('该笔交易对签署成功!')
                    this.$router.go(-1);
                } else {
                    this.showPluginAuto('该笔交易对签署失败!')
                }
            }).catch(e => {
                console.log(e);
            });
        }
        
    },
    created() {
        if(!this.$route.params.contract) {
            this.$router.push('/mine');
        }
        this.contract = this.$route.params.contract
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
    width: 3.0rem;
    height: 3.0rem;
    border-radius: 0%;
}

</style>
