<template>
  <div>
    <img src="../assets/images/bazaar.png" class="imgDemo" alt="" />
    <navs></navs>
  </div>
</template>
<script>
//import { XHeader, Group, Cell } from 'vux'
import Navs from '@/components/Navs.vue'

export default {
  components: {
    Navs
  },
  data () {
    return {
      msg: '众筹'
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.imgDemo {
  width: 100%;
  height: auto;
}
</style>
