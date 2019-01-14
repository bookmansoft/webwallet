<template>
  <div>
      <x-header :left-options="{preventGoBack: true}" @on-click-back="onBack">{{headerTitle}}</x-header>
    <group title="版本信息">
        <div style="padding:15px;"><p>{{version}}</p></div>
    </group>
  </div>
</template>
<script>
import { XHeader, Group} from 'vux'

export default {
  components: {
    XHeader,  Group
  },
  data () {
    return {
      version: '当前版本1.12',
      headerTitle: '关于我们'
    }
  },
  methods: {
      onBack() {
        this.$router.go(-1);
      }
  },
}
</script>