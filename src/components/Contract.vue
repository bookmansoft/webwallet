<template>
    <div>
        <div v-for="(item, index) in contractList" :key="index" class="gameItem">
        <flexbox @click.native="contracInfo(item, index)">
            <flexbox-item :span="3" style="padding:0.3rem;">
            <div class="flex-demo-left" style="text-align:center;">
                <img src="static/images/gamegold/logo.png" class="img-game-list" />
            </div></flexbox-item>
            <flexbox-item>
            <div style="padding-left:0px;">
                <p><span style="color: #888; font-size:15px;">游戏金：{{GLOBAL.formatGameGold(item.src)}}千克</span></p>
                <p><span style="color: red; font-size:14px;">比特币：{{item.dst/100000000}}</span></p>
                <!--<p><span style="color: #888; font-size:10px;">{{item.addr}}</span></p>-->
            </div>
            </flexbox-item>
        </flexbox>
        </div>
    </div>
</template>
<script>

import {Flexbox, FlexboxItem} from 'vux'
export default {
    name: 'Contract',
    components: {
        Flexbox, FlexboxItem
    },   
    data () {
        return {
            contractList:[]
        }
    },
    methods: {
        // 获取发布数据
        getContractList() {
            let data = {func:'ContractList', control: 'contract', oemInfo: this.GLOBAL.oemInfo};
            this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
                console.log(res.data);
                this.contractList = res.data.ret;
            }).catch(res => {
                console.log(res);
            })
        },
        contracInfo(item, index) {
            this.$router.push({ name: 'ContractInfo', params: { contract: item }})
        }
    },
    created() {
        this.getContractList();
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
