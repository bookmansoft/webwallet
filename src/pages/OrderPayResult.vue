<template>
  <div>
    <msg :title="title" :buttons="buttons" :icon="icon"></msg>
  </div>
</template>

<script>
import { Msg, Divider, XButton } from 'vux'

export default {
  components: {
    Msg,
    Divider,
    XButton
  },
  methods: {

  },
  data () {
    return {
      title: '开通成功',
      description: 'msg description',
      icon: '',
      buttons: [{
        type: 'default',
        text: '好的',
        link: '/mine'
      }]
    }
  }
}
</script>