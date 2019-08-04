<!-- 空数据集展示组件

-->
<template>
  <div class="no-data-box">
    <img :src="src" />
  </div>
</template>

<script>

export default {
  props: [
    'src',
    'msg'
  ],
  data () {
    return {

    }
  },
  methods: {
      
  },
  created() {

  }
}
</script>

<style scoped lang="less">

.no-data-box {
  margin: 0 auto;
  text-align: center;
  /*border: 1px solid #f00;*/

  width: 700px;
  height: 260px;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 11;
  /*设定这个div的margin-top的负值为自身的高度的一半,margin-left的值也是自身的宽度的一半的负值.*/ 
    /*高为400,那么margin-top为-200px*/ 
    /*宽为700那么margin-left为-350px;*/ 
  margin: -100px 0 0 -350px;
}

.no-data-box img {
    width: 12rem;
    height: 12rem;
}
</style>