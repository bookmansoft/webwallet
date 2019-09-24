<!-- 标准列表组件
-->
<template>
  <div>
    <ScrollViewer :config="config">
      <template v-slot:default="props">
          <panel :header="panelTitle" :list="props.content" :type="config.type" @on-click-item="itemDetail" @on-img-error="onImgError"></panel>        
      </template>
    </ScrollViewer>
  </div>
</template>

<script>
import {
  Panel,
} from "vux";
import ScrollViewer from "@/components/ScrollViewer.vue";

export default {
  name: 'PanelList',
  components: {
    Panel,
    ScrollViewer,
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
