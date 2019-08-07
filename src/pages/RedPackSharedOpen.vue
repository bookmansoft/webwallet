<!-- 多人红包打开页面
-->
<template>
  <div>
    <box gap="10px 10px">
      <div id="imgDiv" align="center" @click="openPack">
        <img style="width:250px" src="/static/img/manyRed/redpacketunpack.jpg">
      </div>
    </box>
  </div>
</template>
<script>
import {
  Box,
  TransferDomDirective as TransferDom
} from "vux";

export default {
  components: {
    Box,
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      send_id:-1,
    };
  },
  computed: {
    userBase() {
      return this.$store.state.user.auth;
    }
  },
  methods: {
    //点击图标打开红包
    openPack() {
      this.$router.push( `/redpackshared/receive/${this.send_id}`);
    }
  },
  created: function() {
    if(!this.userBase.uid) {
      this.$router.push({ name: 'Login', params: { path: `/redpackshared/unpack/${this.$route.params.send_id}` }});
    } else {
      this.send_id = this.$route.params.send_id;

      this.remote.fetching({
        func: "sharedredpack.Retrieve",
        id: this.send_id,
      }).then(res => {
        if(res.code == 0) {
          if(res.data.state_id == 3 || res.data.state_id == 0) {
            throw new Error(`sharedredpack.Retrieve: expired`);
          } else if(res.data.state_id == 2) {
            this.$router.push(`/redpackshared/receive/${this.send_id}`);
          }
        } else {
          throw new Error(`sharedredpack.Retrieve: ${res.code}`);
        }
      }).catch(e=>{
        console.error(e);
        this.$router.push('/home');
      });
    }
  }
};
</script>

<style scoped>
#imgDiv {
  margin-top: 45px;
  margin-bottom: 45px;
  margin-left: 50px;
  margin-right: 50px;
}
</style>