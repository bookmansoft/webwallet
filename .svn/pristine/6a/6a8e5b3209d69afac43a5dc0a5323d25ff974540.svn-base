<template>
  <div>
      <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
      <panel header="道具列表" :list="propList" type="5" @on-img-error="onImgError"></panel>
  </div>
</template>
<script>
import { getPropByOid } from "../assets/js/cp.js"
import {XHeader, Panel} from 'vux'

export default {
  name: 'Props',
  components: {
    XHeader, Panel
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
            console.log(res.data)
            for (var i = 0; i < res.data.props.length; i++) {
                let item = res.data.props[i]
                /*
                setTimeout( function() {
                    getPropInfo(that.axios, that.myProps, item);
                }, i*800);
                */
                getPropByOid(that, item, function(prop) {
                    let item = {
                        src: prop.prop_icon,
                        title: prop.prop_name,
                        desc: '含金：' + that.GLOBAL.formatGameGold(prop.gold) + '千克'
                    }
                    that.propList.push(item)
                })
            }
        });
      },
      onImgError (item, $event) {
        console.log(item, $event)
      }
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