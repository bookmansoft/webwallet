<template>
  <div>
    <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
      <!--
      <panel header="道具列表" :list="propList" type="5" @on-img-error="onImgError"></panel>
      -->
      <!--
      <scroller v-show="isShow" v-model="scrollerStatus" height="-46" lock-x scrollbar-y ref="scroller" :bounce="isbounce"
              :use-pullup="showUp" :pullup-config="upobj" @on-pullup-loading="selPullUp">
      <div>

        <group :title="groupTitle">
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
        </group>
        
        <div style="padding: 10px 80px 20px 80px "><divider v-if="isBottom">到底了</divider></div>

      </div>
      </scroller>
      <loading v-model="showLoading" :text="textLoading"></loading>
      -->
      <group :title="groupTitle">
        <grid :cols="4" :show-lr-borders="false" :show-vertical-dividers="false">
            <grid-item v-for="(item, index) in propList" :key="index">
              <div class="grid-center" @click="gotoPropDetail(item, index)">
                <img :src="item.result.icon" class="img-prop-list" />
                <p class="grid-prop-title"><span>{{item.result.props_name}}</span></p>
              </div>
            </grid-item>
        </grid>
      </group>
  </div>
</template>

<script>

import {Scroller, Group, XHeader, Panel, Flexbox, FlexboxItem, Loading, Divider, Grid, GridItem} from 'vux'
import { setTimeout } from 'timers';

export default {
  name: 'Props',
  directives: {
    
  },
  components: {
    Scroller, Group, XHeader, Panel, Flexbox, FlexboxItem, Loading, Divider, Grid, GridItem
  },
  activated () {
      this.$refs.scroller.reset()
  },
  data () {
    return {
        headerTitle: '我的道具',
        propList: [],
        groupTitle: '道具数量：0',
        type: '1',
        isBottom: false,
        PageIndex: 1,//页码从第一页开始
        PageSize: 5,//煤业显示的条数
        isShow: false,//是否显示scroller,第一次请求数据过程中隐藏插件，不隐藏的时候会显示“请上拉刷新数据”的字样，不好看
        showLoading: false,
        showUp: true,
        isbounce: false,
        lists: [],
        upobj: {
          content: '请上拉刷新数据',
          pullUpHeight: 20,
          height: 60,
          autoRefresh: false,
          upContent: '请上拉刷新数据',
          loadingContent: '加载中...',
          clsPrefix: 'xs-plugin-pullup-'
        },
        isShowLoading: false,
        textLoading: '加载中',
        scrollerStatus: {
          pullupStatus: 'default'
        }
    }
  },
  methods: {
      onBack() {
        this.$router.push('/mine')
      },
      selPullUp() {
        console.log('selPullUp')  
        this.showLoading = true
        setTimeout(()=>{
          this.getProps(this.PageIndex)
        }, 1000)
      },
      scrollerReset() {
        this.$refs.scroller.donePullup()
        //this.$refs.scroller.reset({top: 500})
        
        this.$nextTick(() => {
              this.$refs.scroller.reset()
        })
        
      },

      // 道具数量
      getPropCount() {
        let data = { func: 'PropCount', control: 'prop', oemInfo: this.GLOBAL.oemInfo, 
            uid: this.GLOBAL.userBase.uid
        };
        let that = this;
        that.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            if(res.data.errcode=='success') {
               if(res.data.count > 0) {
                 that.getProps(that.PageIndex)
               }
               that.groupTitle = '道具数量：'+res.data.count
            }
        })
      },

      // 发送请求 获取道具
      getProps(page) {
        let data = { func: 'PropList', control: 'prop', oemInfo: this.GLOBAL.oemInfo, 
            uid: this.GLOBAL.userBase.uid, 
            page: page, 
        };
        let that = this;
        that.axios.post(this.GLOBAL.apiUrl, data).then(res => {
            if(res.data.errcode=='success') {
              //console.log('props.length', res.data.props.length)  
              that.PageIndex++
              if(res.data.props.length >0 ) {
                  res.data.props.sort(function(a, b){
                      return  b.time - a.time;
                  });
              }
              for (var i = 0; i < res.data.props.length; i++) {
                  let prop = res.data.props[i]
                  that.getPropFromCp(prop)
              }
              if(res.data.props.length < 10) {
                //console.log('pullupStatus.disabled')
                that.scrollerStatus.pullupStatus = 'disabled' // 禁用下拉
                that.showUp = false
                that.isBottom = true
              } else {
                that.scrollerStatus.pullupStatus = 'default' 
                this.getProps(that.PageIndex)
              }
            }
            //that.scrollerReset()
            that.showLoading = false
        });
      },

      getPropFromCp(prop) {
          console.log('prop', prop)
          let url = encodeURI(prop.cp.url + '/prop/' + prop.oid)
          let data = {func:'GetCpProxy', control: 'cp', url: url, oemInfo: this.GLOBAL.oemInfo} 
          this.axios.post(this.GLOBAL.apiUrl, data).then(resProxy => {
              if(resProxy.data.hasOwnProperty('result')) {
                  let propResult = resProxy.data.result
                  prop.result = propResult
                  prop.desc = '价格：' + this.GLOBAL.formatGameGold(propResult.props_price) + '千克',
                  this.propList.push(prop)
              }
          }) 
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
      } 
  },
  mounted() {
    this.isShow = true
    /*
    this.$nextTick(() => {
        this.$refs.scroller.reset()
    })
    */
    this.getPropCount()
  }
}
</script>

<style lang="less" scoped>

.grid-center {
  display: block;
  text-align: center;
  /*color: #666;*/
  background-color:#FAFAFA;
}

.grid-prop-title {
  color: #999;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  width: 85px;
}

.propItem {
  background-color: #FAFAFA;
  margin-top: 0.6rem;
  padding: 0.5rem;
}
.img-prop-list {
  width: 4.2rem;
  height: 4.2rem;
  border-radius: 12%;
}

.xs-plugin-pulldown-container {
 line-height: 40px;
 font-size: 18px;
 color: red;
}
.xs-plugin-pullup-container {
 line-height: 40px;
 font-size: 100px;
 color: red;
 }
</style>