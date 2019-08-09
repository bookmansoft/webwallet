<!-- 标准列表组件
-->
<template>
  <div>
    <div v-if="isLoadMore">
      <scroller
        v-model="scrollerStatus"
        height="-100"
        lock-x
        scrollbar-y
        ref="scroller"
        :bounce="true"
        :use-pulldown="true"
        :pulldown-config="downobj"
        @on-pulldown-loading="selPullDown"
        :use-pullup="true"
        :pullup-config="upobj"
        @on-pullup-loading="selPullUp"
      >
        <div>
          <panel :header="panelTitle" :list="content" :type="config.type" @on-click-item="itemDetail" @on-img-error="onImgError"></panel>        
        </div>
      </scroller>
    </div>

    <!-- 列表为空时替代显示 -->
    <div v-if="isLoadMore && content.length==0 && showNoData==true">
      <no-data :src="config.nodata"></no-data>
    </div>

    <!-- 载入提示 -->
    <div v-if="!isLoadMore">
      <load-more tip="正在加载" style="position: relative; top:250px;" :show-loading="!isLoadMore"></load-more>
    </div>
  </div>
</template>

<script>
import {
  Panel,
  Scroller,
  LoadMore,
} from "vux";
import NoData from "@/components/NoData.vue";

export default {
  name: 'PanelList',
  components: {
    Panel,
    Scroller,
    LoadMore,
    NoData,
  },
  data: function() {
    return {
      downobj: {
        content: "下拉刷新数据...",
        downContent: "下拉刷新数据...",
        upContent: "释放刷新数据",
        loadingContent: "加载中...",
        pullUpHeight: 50,
        height: 40,
        autoRefresh: false,
        clsPrefix: "xs-plugin-pulldown-"
      },
      upobj: {
        content: "",
        upContent: "",
        downContent: "释放获取数据",
        loadingContent: "加载中...",
        pullUpHeight: 50,
        height: 40,
        autoRefresh: false,
        clsPrefix: "xs-plugin-pullup-"
      },
      scrollerStatus: {
        pullupStatus: "default"
      },
      isLoadMore: false,
      showNoData: false,
      isActive: false,
    };
  },
  props: [
    'config',
    'selection',
  ],
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    selPullDown() {
      //用户选择下拉刷新，清除本地数据，重新拉取
      this.getContent(true);
      setTimeout(() => {
        if(this.isActive) {
          this.$refs.scroller.donePulldown();
          this.$refs.scroller.reset({ top: 0 });
        }
      }, 1000);
    },
    selPullUp() {
      //用户选择上滑获取新数据，更新当前页码
      this.getContent();
      setTimeout(() => {
        if(this.isActive) {
          this.$refs.scroller.donePullup();
        }
      }, 1000);
    },
    itemDetail(data) {
      this.$emit('panel_item_click', data);
    },
    /**
     * 获取列表, flash 强制更新
     */
    getContent(flash) {
      this.isLoadMore = false;
      this.showNoData = false;

      if(!!flash) {
        this.$store.dispatch(`${this.config.store}/clear`);
      }

      this.$store.dispatch(`${this.config.store}/pull`, this.selection).then(ret => {
        if(!ret) {
          //没有新的数据了，禁止继续下拉
          this.scrollerStatus.pullupStatus = 'disabled';
        }
      });

      setTimeout(()=>{
        this.showNoData = true;
        this.isLoadMore = true;
      }, 500);
    },
  },
  computed: {
    content() { return this.$store.state[this.config.store].list; },
    panelTitle() { return `${this.config.title}(${this.content.length})`; },
  },
  created() {
    this.getContent();
  },
  mounted() {
    this.isActive = true;
  },
  beforeDestroy() {
    this.isActive = false;
  },
};
</script>

<style scoped>
.root {
  overflow-x: hidden;
  background-color:white;
  margin-top:-8px
}
</style>
