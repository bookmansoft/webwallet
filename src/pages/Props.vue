<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
      <!--
      <panel header="道具列表" :list="propList" type="5" @on-img-error="onImgError"></panel>
      -->
    <div v-for="(item, index) in propList" :key="index" class="propItem">
      <flexbox @click.native="gotoPropDetail(item, index)">
        <flexbox-item :span="2.5" style="padding:0.3rem;">
          <div class="flex-demo-left">
            <img :src="item.result.icon" class="img-prop-list" />
          </div></flexbox-item>
        <flexbox-item>
          <div style="padding-left:15px;">
            <p><span style="font-size:16px;">{{item.result.props_name}}</span></p>
            <br />
            <p><span style="color: #888; font-size:14px;">{{item.desc}}</span></p>
          </div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script>

import {XHeader, Panel, Flexbox, FlexboxItem} from 'vux'

export default {
  name: 'Props',
  components: {
    XHeader, Panel, Flexbox, FlexboxItem
  },
  data () {
    return {
        headerTitle: '我的道具',
        propList: []
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },
      // 发送请求 获取道具
      getProps(page) {
        let data = { func: 'UserProp', control: 'profile', oemInfo: this.GLOBAL.oemInfo, 
            uid: this.GLOBAL.uid, 
            openid: this.GLOBAL.openid, 
            page: page, 
        };
        var that = this;
        that.axios.post(this.GLOBAL.apiUrl, data)
            .then(res => {
            for (var i = 0; i < res.data.props.length; i++) {
                let prop = res.data.props[i]
                let url = encodeURI(prop.cp.url + '/prop/' + prop.oid)
                let data = {func:'GetCpProxy', control: 'cp', url: url, oemInfo: this.GLOBAL.oemInfo} 
                
                this.axios.post(this.GLOBAL.apiUrl, data).then(resProxy => {
                    if(resProxy.data.hasOwnProperty('result')) {
                        let propResult = resProxy.data.result
                        prop.result = propResult
                        prop.desc = '价格：' + that.GLOBAL.formatGameGold(propResult.props_price) + '千克',
                        that.propList.push(prop)
                    }
                })  
            }
        });
      },
      onImgError (item, $event) {
        console.log(item, $event)
      },

      gotoPropDetail(item, index) {
        console.log('gotoPropDetail', index)
        console.log('prop', item)
        this.$router.push({ name: 'PropDetail', params: { prop: item }})
      },
  },

  created() {
      if(this.GLOBAL.uid==0 || this.GLOBAL.openid=='') {
          this.$router.push('/mine')
      } else {
          this.getProps(1)
      }
  }
}
</script>

<style lang="less" scoped>

.propItem {
  background-color: white;
  margin-top: 0.6rem;
  padding: 0.5rem;
}
.img-prop-list {
    width: 4.2rem;
    height: 4.2rem;
    border-radius: 12%;
}

</style>