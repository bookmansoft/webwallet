<!-- 标准列表组件
-->
<template>
  <div>
    <scrolllist :config="config">
      <template v-slot:default="props">
          <panel :header="panelTitle" :list="props.content" :type="config.type" @on-click-item="itemDetail" @on-img-error="onImgError"></panel>        
      </template>
    </scrolllist>
  </div>
</template>

<script>
import {
  Panel,
} from "vux";
import scrolllist from "@/components/ScrollList.vue";

export default {
  name: 'PanelList',
  components: {
    Panel,
    scrolllist,
  },
  data: function() {
    return {
    };
  },
  props: [
    'config',
  ],
  methods: {
    onImgError (item, $event) {
      console.log(item, $event)
    },
    itemDetail(data) {
      this.$emit('panel_item_click', data);
    },
  },
  computed: {
    content() { return this.$store.state[this.config.store].list; },
    panelTitle() { return `${this.config.title}(${this.content.length})`; },
  },
  created() {
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
