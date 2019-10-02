<!-- 推广员着陆页面
本页面不包含任何实际展示元素，仅仅作为跳转页面，执行必要的数据分析记录操作

推广员在CRM后台生成指向本页面的链接，在自有渠道进行展示; 当用户访问本页面时，我们分析来访者参数，针对不同情况做区别处理：

1. 产品二维码：
广播用户地址和媒体识别码间的映射关系，然后引导用户访问相应游戏

2. 平台二维码：
记录用户帐户和媒体识别码间的映射关系，然后引导用户访问钱包首页。
当用户在一定期限内访问平台上的任意游戏产品时，我们广播用户地址和媒体识别码间的映射关系，然后引导用户访问相应游戏

-->
<template>
  <div></div>
</template>
<script>
export default {
  directives: {
  },
  components: {
  },
  data() {
    return {
      vData: {},
      guider: {},
    };
  },
  computed: {
    userBase() {
      return this.$store.state.user.auth;
    }
  },
  methods: {
  },
  created: function() {
    if(!this.userBase.uid) {
      this.$router.push({ name: 'Login', params: { path: `/guider/${this.$route.params.guider}` }});
    } else {
      this.guider = JSON.parse(decodeURIComponent(this.$route.params.guider));

      console.log('guider obj', this.guider);

      //记录师徒关系
      this.$store.dispatch('cp/setGuider', {
        src: this.guider.gaddr,
        cid: this.guider.cid,
      }).then(res => {
        if(!!this.guider.cid) {
          console.log('guider', 1);
          //跳转至指定游戏
          window.location.href = `${res.data.cpurl}?kyc=${encodeURIComponent(JSON.stringify(res.data))}`;
        } else {
        console.log('guider', 2);
          this.$router.push({ name: 'Home' });
        }
      }).catch(e=>{
        console.log('guider 3', e.message);
        this.$router.push({ name: 'Home' });
      });
    }
  }
};
</script>

<style scoped>
</style>