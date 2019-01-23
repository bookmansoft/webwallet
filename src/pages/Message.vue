<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>

    <div v-if="isLoadMore && notifys.length > 0">
      <group :title="title">
          <div class="notify-item">
              <div v-for="(item, index) in notifys" :key="index"> 
                  <div style="height:8px; width:100%; background-color:#FAFAFA"></div>
                  <div style="padding:5px 0px 20px 15px">
                      <p><span>时间：{{GLOBAL.formatDateStr(new Date(item.create_time*1000), 'yyyy-MM-dd HH:mm:ss')}}</span></p>
                      <p><span>内容：{{item.contentType}}</span></p>
                      <p><span>状态：{{item.statusLabel}}</span></p>
                      <p v-if="item.status !=3" style="top:8px; position: relative;"><x-button mini style="width:70px;" @click.native="notifyPay(item)">处理</x-button></p>
                  </div>
              </div>
          </div>
      </group>
    </div>

    <div v-if="isLoadMore && notifys.length == 0">
        <no-data src="static/img/default/no-message.png"></no-data>
    </div>

    <div v-if="!isLoadMore">
        <load-more tip="正在加载" style="position: relative; top:200px;" :show-loading="!isLoadMore"></load-more>
    </div>

  </div>
</template>

<script>
import { XHeader, XButton, Flexbox, FlexboxItem, Group, Panel, LoadMore } from 'vux'
import NoData from '@/components/NoData.vue'

export default {
  name: 'Message',
  components: {
    XHeader, XButton, Flexbox, FlexboxItem, Group, Panel, LoadMore, NoData
  },
  props: [
    'mine'
  ],
  data () {
    return {
      headerTitle: '历史消息',
      title: '',
      notifyCount: 0,
      notifys: [],
      isLoadMore: false,
    }
  },
  methods: {
    onBack() {
        this.$router.push("/mine")
    },
    notifyPay(item) {
      console.log(item)
      this.$router.push({ name: 'PropOrderPay', params: { data: item }})
    },
    getNotify() {
         let data = {
          func:'NotifyList',
          control: 'wallet',
          uid: this.GLOBAL.uid,
          openid: this.GLOBAL.openid,
          last: 0,
          oemInfo: this.GLOBAL.oemInfo
        };
        this.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            console.log(res.data);
            if(res.data.errcode='success') {
                //this.notifys = res.data.notifys
                this.notifyCount = res.data.notifys.length
                this.title = '共' + this.notifyCount + '条消息'
                res.data.notifys.forEach(element => {
                  let item = element
                  if(item.status != 3) {
                    item.statusLabel = '未处理'
                    item.payEnable = 1
                  } else {
                    item.statusLabel = '已处理'
                    item.payEnable = 0
                  }
                  item.contentType = '订单支付请求'
                  this.notifys.push(item)
                  //this.notifys.push(item)
                });
            }
            this.isLoadMore = true
        }).catch(res => {
            console.log(res)
            this.isLoadMore = true
        });  
    }
  },
  created() {
    if(this.GLOBAL.userProfile == null) {
      this.$router.push('/mine')
    }
    this.getNotify()
  }
}
</script>
<style lang="less" scoped>
.notify-item span {
  font-size:13px;
  line-height: 1rem;
  height: 1rem;
}
.flex-demo {
  text-align: left;
  padding-left: 10px;
  font-size: 15px;
  background-clip: padding-box;
  background-color:white;
}

</style>